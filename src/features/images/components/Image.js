import React, { useCallback, useState } from "react";

function Image() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState({ name: "", image: "" });
  const [postImage, setPostImage] = useState({ name: "", image: "" });

  const convertToBase64 = (file) => {
    return new Promise((resolve, rejects) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        rejects(error);
      };
    });
  };

  const handleFile = async (e) => {
    const name = e.target.files[0].name;
    setFile(e.target.files[0]);
    // setPreview(URL.createObjectURL(e.target.files[0]));
    const base64 = await convertToBase64(e.target.files[0]);
    const data = { name: name, image: base64 };
    setPostImage({ ...postImage, ...data });
  };

  const base64ToImage = (data) => {
    const name = data.data.name;
    const base64string = data.data.image;
    const base64Data = base64string.split(",")[1];
    const binaryString = window.atob(base64Data);

    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "image/*" });
    const url = URL.createObjectURL(blob);

    const previewData = { name: name, image: url };
    setPreview({ ...preview, ...previewData });
  };

  const createPost = (newImage) => {
    try {
      fetch("http://localhost:8080/upload/m", {
        method: "POST",
        crossOrigin: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newImage),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          base64ToImage(data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const postRequest = () => {
    const formData = new FormData();
    formData.append("image", file);

    fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // postRequest();
    createPost(postImage);
  };

  const downloadFile = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = preview.image;
    link.download = preview.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="uploadContainer">
        <input type="file" onChange={(e) => handleFile(e)} />
        <button onClick={(e) => handleUpload(e)}> upload image</button>
      </div>

      <div className="imageContainer">
        <div className="container">
          <img src={preview.image} />
        </div>
        <button
          onClick={(e) => {
            downloadFile(e);
          }}
        >
          Download Image
        </button>
      </div>
    </>
  );
}

export default Image;
