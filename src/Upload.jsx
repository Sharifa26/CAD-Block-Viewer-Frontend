import React, { useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:4000"; // You can move this to a config file if needed

function Upload() {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        withCredentials: true,
      });

      toast.success(" File uploaded successfully!", {
        position: "top-center",
      });

      // Optional: console.log or handle the response
      console.log("Upload response:", response.data.message);
    } catch (error) {
      toast.error(" File upload failed!", {
        position: "top-center",
      });

      // Optional: log error
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="left-side">
        <div className="upload-text">
          <h2>Welcome to the CAD Viewer</h2>
          <p>Upload, View & Manage Your CAD Blocks – All in One Place.</p>
          <p>
            Upload your DXF files to visualize and explore CAD blocks with ease.
            You can search, filter, and even store block data in the database
            for future reference.
          </p>
        </div>

        <div className="upload-container">
          <p>
            <strong>Click here or drop files to upload</strong>
          </p>
          <p>(only .dxf files)</p>

          <input
            type="file"
            accept=".dxf"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button className="upload-btn" onClick={handleUploadClick}>
            ⬆ Upload File
          </button>

          <ToastContainer />
        </div>
      </div>

      <img src="/assets/side.svg" alt="CAD Viewer" className="image" />
    </div>
  );
}

export default Upload;
