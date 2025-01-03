import React, { useCallback, useEffect, useState } from "react";

function ImageUploders() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState({ name: "", image: "" });
  const [postImage, setPostImage] = useState({ name: "", image: "" });

  // const compressImage = (file) => {
  //   const url = URL.createObjectURL(file);
  //   const img = new Image();
  //   img.src = url;

  //   console.log("file", file, file.size);
  //   img.onload = () => {
  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = img.naturalWidth;
  //     canvas.height = img.naturalHeight;

  //     ctx.drawImage(img, 0, 0);

  //     canvas.toBlob(
  //       async (blob) => {
  //         base64 = await convertToBase64(blob);
  //         console.log();
  //       },
  //       "image/webp",
  //       0.8
  //     );
  //     return base64;
  //   };
  // };

  const convertToBase64 = (file) => {
    return new Promise((resolve, rejects) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          async (blob) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
              rejects(error);
            };
          },
          "image/webp",
          0.8
        );
      };
      // const fileReader = new FileReader();
      // fileReader.readAsDataURL(file);
      // fileReader.onload = () => {
      //   resolve(fileReader.result);
      // };
      // fileReader.onerror = (error) => {
      //   rejects(error);
      // };
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
          console.log("data response", data);
          base64ToImage(data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const postRequest = () => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   fetch("http://localhost:8080/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Server response:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading file:", error);
  //     });
  // };

  const handleUpload = (e) => {
    e.preventDefault();
    // postRequest();
    createPost(postImage);
  };

  return (
    <>
      <div className="uploadContainer">
        <input type="file" id="file" onChange={(e) => handleFile(e)} />
        <label htmlFor="file">Choose a image</label>
        <button className="upload_container" onClick={(e) => handleUpload(e)}>
          upload
        </button>
      </div>

      <div className="imageContainer">
        <div className="image_Container">
          <img src={preview.image} />
        </div>
      </div>
    </>
  );
}

export default ImageUploders;
