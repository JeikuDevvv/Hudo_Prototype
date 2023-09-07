import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const DataList = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/folderList")
      .then((response) => {
        const folders = response.data;
        setDataList(folders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching folder list:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

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
            <th>Number Code</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((folderName) => (
            <DataItem key={folderName} folderName={folderName} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DataItem = ({ folderName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const encodedFolderName = encodeURIComponent(folderName);

    axios
      .get(`http://localhost:3001/api/data/${encodedFolderName}`)
      .then((response) => {
        const jsonData = response.data;
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
        setError(error);
        setLoading(false);
      });
  }, [folderName]);

  const handleViewClick = () => {
    console.log("View button clicked for folder:", folderName);
  };

  const handleDownloadClick = () => {
    console.log("Download button clicked for folder:", folderName);
  };

  const handleDeleteClick = () => {
    console.log("Delete button clicked for folder:", folderName);
  };

  if (loading) {
    return (
      <tr>
        <td colSpan="7">Loading...</td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan="7">Error: {error.message}</td>
      </tr>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.number_code}</td>
      <td>{data.sender}</td>
      <td>{data.receiver}</td>
      <td>{data.date}</td>
      <td>{data.description}</td>
      <td>
        <button className="btn btn-primary" onClick={handleViewClick}>
          View
        </button>
        <button className="btn btn-success" onClick={handleDownloadClick}>
          Download
        </button>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </td>
    </tr>
  );
};

DataItem.propTypes = {
  folderName: PropTypes.string.isRequired,
};

export default DataList;
