// InOutForm.jsx
import { useState } from "react";
import axios from "axios";

const InOutForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    sender: "",
    receiver: "",
    date: "",
    description: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.title ||
      !formData.sender ||
      !formData.receiver ||
      !formData.date ||
      !formData.description ||
      !formData.attachment
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create a FormData object to upload the file
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("sender", formData.sender);
    formDataToSend.append("receiver", formData.receiver);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("attachment", formData.attachment);

    try {
      // Use Axios to send the formDataToSend to your server
      await axios.post("http://localhost:3001/upload", formDataToSend);

      // Clear the form fields after successful submission
      setFormData({
        title: "",
        sender: "",
        receiver: "",
        date: "",
        description: "",
        attachment: null,
      });

      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <h1>Data Input Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sender" className="form-label">
            Sender
          </label>
          <input
            type="text"
            className="form-control"
            id="sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="receiver" className="form-label">
            Receiver
          </label>
          <input
            type="text"
            className="form-control"
            id="receiver"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add similar fields for sender, receiver, date, and file input */}
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">
            Attachment (png, jpg, pdf)
          </label>
          <input
            type="file"
            className="form-control"
            id="attachment"
            name="attachment"
            accept=".png, .jpg, .pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InOutForm;
