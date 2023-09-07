import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const DisplayData = ({ folderName }) => {
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

  const handleDownloadClick = () => {
    console.log("Download button clicked for folder:", folderName);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <h2>Data Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>Title</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th>Number Code</th>
            <td>{data.number_code}</td>
          </tr>
          <tr>
            <th>Sender</th>
            <td>{data.sender}</td>
          </tr>
          <tr>
            <th>Receiver</th>
            <td>{data.receiver}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{data.date}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{data.description}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-success" onClick={handleDownloadClick}>
        Download Attachment
      </button>
    </div>
  );
};

DisplayData.propTypes = {
  folderName: PropTypes.string.isRequired,
};

export default DisplayData;
