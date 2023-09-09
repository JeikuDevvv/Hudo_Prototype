/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

import ViewModal from "./ViewModal";

const DataList = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    // Fetch the list of folders from your server
    axios
      .get("http://localhost:3001/api/folderList")
      .then((response) => {
        const folders = response.data;
        setDataList(folders);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching folder list:", error);
        setError(error); // Set the error state if an error occurs
        setLoading(false); // Set loading to false when an error occurs
      });
  }, []);

  const handleViewClick = (folderName) => {
    setSelectedFolder(folderName);
  };

  const closeViewModal = () => {
    setSelectedFolder(null);
  };

  const handleDownloadClick = (folderName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `http://localhost:3001/uploads/${encodeURIComponent(
      folderName
    )}/attachment`;
    downloadLink.download = "attachment"; // You can set the desired filename here
    downloadLink.click();
  };

  const handleDeleteClick = (folderName) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmDelete) {
      axios
        .delete(
          `http://localhost:3001/api/data/${encodeURIComponent(folderName)}`
        )
        .then(() => {
          console.log("Data deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          alert("An error occurred while deleting the data");
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Data List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((folderName) => (
            <tr key={folderName}>
              <td>{folderName}</td>
              <td>{/* Add sender data here */}</td>
              <td>{/* Add receiver data here */}</td>
              <td>{/* Add date data here */}</td>
              <td>{/* Add description data here */}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewClick(folderName)}
                >
                  View
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleDownloadClick(folderName)}
                >
                  Download
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(folderName)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFolder && (
        <ViewModal folderName={selectedFolder} onClose={closeViewModal} />
      )}
    </div>
  );
};

export default DataList;
