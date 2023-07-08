import React, { useState } from "react";
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BloodRequestForm = ({ onClose }) => {
  const { dispatch } = useBloodRequestsContext();
  const { user } = useAuthContext();

  const [patientName, setPatientName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const bloodRequest = { patientName, bloodType, location, phoneNumber };

    const response = await fetch("/api/bloodRequests", {
      method: "POST",
      body: JSON.stringify(bloodRequest),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setPatientName("");
      setBloodType("");
      setLocation("");
      setPhoneNumber("");
      setError(null);
      setEmptyFields([]);
      console.log("new blood request added", json);
      dispatch({ type: "CREATE_BLOODREQUEST", payload: json });
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Enter A Blood Request</h3>

      <label>Patient Name:</label>
      <input
        type="text"
        onChange={(e) => setPatientName(e.target.value)}
        value={patientName}
        className={emptyFields.includes("patientName") ? "error" : ""}
      />

      <label>Blood Type:</label>
      <select
        onChange={(e) => setBloodType(e.target.value)}
        value={bloodType}
        className={`select-dropdown ${emptyFields.includes("bloodType") ? "error" : ""}`}
      >
        <option value="">Select a blood type</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes("location") ? "error" : ""}
      />

      <label>Phone Number:</label>
      <input
        type="text"
        maxLength={10}
        onChange={(e) => {
          const input = e.target.value;
          const phoneNumber = input.slice(0, 10);
          setPhoneNumber(phoneNumber);
        }}
        value={phoneNumber}
      />

      <button>Add Blood Request</button>
      {error && <div className="error">{error}</div>}

      <button onClick={handleClose}>Close Form</button>
    </form>
  );
};

export default BloodRequestForm;
