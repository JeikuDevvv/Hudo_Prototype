import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Load the list of files when the component mounts
    loadFileList();
  }, []);

  const loadFileList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/fileList");

      // Make sure the API response includes the "title" field
      setFiles(response.data);
    } catch (error) {
      console.error("Error loading file list:", error);
    }
  };

  const handleDelete = async (title) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/files/${encodeURIComponent(title)}`
      );
      // Remove the deleted file from the state
      setFiles((prevFiles) => prevFiles.filter((file) => file.title !== title));
      closeModal(); // Close the modal if open
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleView = (file) => {
    // Set the selected file to display in the modal
    setSelectedFile(file);
  };

  const closeModal = () => {
    // Close the modal by resetting the selected file
    setSelectedFile(null);
  };

  return (
    <div className="container mt-5">
      <h2>File List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.title}>
              <td>{file.title}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleView(file)}
                >
                  View
                </button>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleDelete(file.title)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedFile && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedFile.title}</h5>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Sender: {selectedFile.sender}</p>
                <p>Receiver: {selectedFile.receiver}</p>
                <p>Date: {selectedFile.date}</p>
                <p>Description: {selectedFile.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileTable;
