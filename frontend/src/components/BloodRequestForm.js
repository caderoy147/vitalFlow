import React, { useState } from "react";
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const BloodRequestForm = ({ onClose }) => {
  const { dispatch } = useBloodRequestsContext();
  const { user } = useAuthContext();

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospital, setHospital] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [bloodBagsNeeded, setBloodBagsNeeded] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [signatureImage, setSignatureImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file size is within the limit
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds the allowed limit");
        return;
      }

      // Convert the selected image file to Base64-encoded string
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formattedPhoneNumber = phoneNumber.startsWith("+63")
      ? phoneNumber.slice(3)
      : phoneNumber;

    const bloodRequest = {
      patientName,
      age,
      gender,
      bloodType,
      doctorName,
      hospital,
      citizenship,
      bloodBagsNeeded,
      signatureImage,
      location,
      phoneNumber: formattedPhoneNumber,
    };

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
      setAge("");
      setGender("");
      setBloodType("");
      setDoctorName("");
      setHospital("");
      setCitizenship("");
      setBloodBagsNeeded("");
      setSignatureImage("");
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

      <label>Age:</label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes("age") ? "error" : ""}
      />

      <label>Gender:</label>
      <select
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        className={`select-dropdown ${emptyFields.includes("gender") ? "error" : ""}`}
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

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

      <label>Doctor Name:</label>
      <input
        type="text"
        onChange={(e) => setDoctorName(e.target.value)}
        value={doctorName}
        className={emptyFields.includes("doctorName") ? "error" : ""}
      />

      <label>Hospital:</label>
      <select
        onChange={(e) => setHospital(e.target.value)}
        value={hospital}
        className={`select-dropdown ${emptyFields.includes("hospital") ? "error" : ""}`}
      >
        <option value="">Select hospital</option>
        <option value="Chonghua">Chonghua</option>
        <option value="Cebu City Hospital">Cebu City Hospital</option>
      </select>

      <label>Citizenship:</label>
      <input
        type="text"
        onChange={(e) => setCitizenship(e.target.value)}
        value={citizenship}
        className={emptyFields.includes("citizenship") ? "error" : ""}
      />

      <label>Blood Bags Needed:</label>
      <input
        type="number"
        onChange={(e) => setBloodBagsNeeded(e.target.value)}
        value={bloodBagsNeeded}
        className={emptyFields.includes("bloodBagsNeeded") ? "error" : ""}
      />

      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes("location") ? "error" : ""}
      />

      <label>Phone Number:</label>
      <div className="phone-number-input">
        <input
          type="text"
          maxLength={11}
          placeholder="+63"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          className={emptyFields.includes("phoneNumber") ? "error" : ""}
        />
      </div>

      <label>Signature Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {signatureImage && (
        <img src={signatureImage} alt="Signature Preview" style={{ width: "100px", height: "100px" }} />
      )}

      <div className="AddBloodRequestButtons">
        <button>Add Blood Request</button>
        {error && <div className="error">{error}</div>}
        <button onClick={handleClose}>Close Form</button>
      </div>    
    </form>
  );
};

export default BloodRequestForm;
