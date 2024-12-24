import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import ImageShow from "./pages/ImageShower";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageShow></ImageShow>,
  },
  {
    path: "/image_upload", 
    element: <Home></Home>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
