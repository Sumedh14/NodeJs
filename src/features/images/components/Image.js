import React, { useCallback, useState } from "react";

function Image() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
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
  let data;
  console.log("data", data);
  console.log("postImage", { ...postImage, ...data });

  const handleFile = async (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    const base64 = await convertToBase64(e.target.files[0]);
    const name = e.target.files[0].name.match(/[^\.]+/)[0];
    data = { name: name, image: base64 };
    console.log("data", data);
    setPostImage({ ...postImage, ...data });
  };

  const createPost = async (newImage) => {
    console.log("newImage", newImage);
    try {
      fetch("http://localhost:8080/upload/m", {
        method: "POST",
        body: newImage,
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
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

    console.log("createPost(postImage)", createPost(postImage));
    createPost(postImage);
  };

  return (
    <>
      <div className="uploadContainer">
        <input type="file" onChange={(e) => handleFile(e)} />
        <button onClick={(e) => handleUpload(e)}> upload image</button>
      </div>

      <div className="imageContainer">
        <div className="container">
          <img src={preview} />
        </div>
        <button>Download Image</button>
      </div>
    </>
  );
}

export default Image;
