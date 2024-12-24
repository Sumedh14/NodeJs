import { Link } from "react-router-dom";
import image from "../../images/image.png";

function Navbar() {
  return (
    <div className="nav_container">
      <img src={image} className="img_logo" alt="logo"></img>
      <div className="link__container">
        <Link to="/">Images</Link>
        <Link to="/image_upload">Upload Image</Link>
      </div>
    </div>
  );
}

export default Navbar;
