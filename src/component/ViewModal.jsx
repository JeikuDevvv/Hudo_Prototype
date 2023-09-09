// Import necessary libraries
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import axios from "axios";

// Define the ViewModal component
const ViewModal = ({ folderName, onClose }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/data/${encodeURIComponent(folderName)}`)
      .then((response) => {
        const jsonData = response.data;
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [folderName]);

  return (
    <div className="modal fade show" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">View Data</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
              <div>
                <p>Title: {data.title}</p>
                <p>Sender: {data.sender}</p>
                <p>Receiver: {data.receiver}</p>
                <p>Date: {data.date}</p>
                <p>Description: {data.description}</p>
                {/* You can display other data fields here */}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop validation for the folderName prop
ViewModal.propTypes = {
  folderName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewModal;
