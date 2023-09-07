import { useState, useEffect } from "react";
import axios from "axios";

const DataList = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // Handle the View button click here (e.g., show a modal with data)
    console.log("View button clicked for folder:", folderName);
  };

  const handleDownloadClick = (folderName) => {
    // Handle the Download button click here (e.g., initiate download)
    console.log("Download button clicked for folder:", folderName);
  };

  const handleDeleteClick = (folderName) => {
    // Handle the Delete button click here (e.g., show a confirmation dialog and delete data)
    console.log("Delete button clicked for folder:", folderName);
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
    </div>
  );
};

export default DataList;
