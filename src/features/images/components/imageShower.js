import { useState, useEffect } from "react";

function ImageShower() {
  const [file, setFile] = useState({});
  const getAllImage = async () => {
    fetch("http://localhost:8080/upload")
      .then((resp) => resp.json())
      .then((data) => setFile(data));
  };

  useEffect(() => {
    getAllImage();
  }, []);

  const downloadFile = (e, data) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = data.image;
    link.download = data.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  console.log(file);
  return (
    <div className="content">
      <div className="image__Container">
        {file.length
          ? file.map((data, index) => (
              <div key={index} className="imageContainer">
                <div className="container">
                  <img src={data.image} />
                </div>
                <button
                  onClick={(e) => {
                    downloadFile(e, data);
                  }}
                >
                  Download Image
                </button>
              </div>
            ))
          : "Loading"}
      </div>
    </div>
  );
}

export default ImageShower;
