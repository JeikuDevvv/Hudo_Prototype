import { useState } from "react";
import axios from "axios";

const InOutForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    number_code: "",
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
    const requiredFields = [
      "title",
      "number_code",
      "sender",
      "receiver",
      "date",
      "description",
      "attachment",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field} field`);
        return;
      }
    }

    // Create a FormData object to upload the file
    const formDataToSend = new FormData();
    for (const field of Object.keys(formData)) {
      formDataToSend.append(field, formData[field]);
    }

    try {
      // Use Axios to send the formDataToSend to your server
      await axios.post("http://localhost:3001/upload", formDataToSend);

      // Clear the form fields after successful submission
      setFormData({
        title: "",
        number_code: "",
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
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="number_code"
            name="number_code"
            value={formData.number_code}
            onChange={handleChange}
            placeholder="Number Code"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            placeholder="Sender"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="receiver"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            placeholder="Receiver"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        <div className="mb-3">
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
