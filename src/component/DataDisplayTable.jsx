import { useState, useEffect } from "react";
import axios from "axios";

const DataDisplayTable = () => {
  const [folderContents, setFolderContents] = useState([]);

  useEffect(() => {
    // Fetch the list of folder names from your server
    axios
      .get("http://localhost:3001/api/folderList")
      .then((response) => {
        const folderNames = response.data;
        // Read the JSON files inside each folder
        const dataPromises = folderNames.map((folderName) =>
          axios.get(`http://localhost:3001/api/data/${folderName}`)
        );

        // Wait for all JSON files to be fetched
        Promise.all(dataPromises)
          .then((responses) => {
            const folderData = responses.map((response) => response.data);
            setFolderContents(folderData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching folder list:", error);
      });
  }, []);

  const handleView = (data) => {
    // Implement the logic to view the data
    console.log("Viewing data:", data);
  };

  const handleDelete = (folderName) => {
    // Implement the logic to delete the data by folderName
    console.log("Deleting data in folder:", folderName);
  };

  const handleDownload = (attachmentPath) => {
    // Implement the logic to download the attachment
    console.log("Downloading attachment:", attachmentPath);
  };

  return (
    <div>
      <h2>Data Display Table</h2>
      <table className="table table-bordered">
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
          {folderContents.map((data, index) => (
            <tr key={index}>
              <td>{data.title}</td>
              <td>{data.sender}</td>
              <td>{data.receiver}</td>
              <td>{data.date}</td>
              <td>{data.description}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleView(data)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(data.title)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleDownload(data.attachment)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplayTable;
