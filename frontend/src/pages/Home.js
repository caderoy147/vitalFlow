import React, { useState, useEffect } from "react";
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import BloodRequestDetails from "../components/BloodRequestDetails";
import BloodRequestForm from "../components/BloodRequestForm";
import ProfileComponent from "../components/ProfileComponent";
import DonateIcon from "../assets/icons/bx_donate-blood.svg";
import RequestIcon from "../assets/icons/material-symbols_search.svg";
import HistoryIcon from "../assets/icons/tabler_book.svg";
import axios from "axios";

const Home = () => {
  const { bloodRequests, dispatch } = useBloodRequestsContext();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isButtonBlurred, setIsButtonBlurred] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchBloodRequests = async () => {
      const response = await fetch("/api/bloodRequests", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BLOODREQUESTS", payload: json });
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchBloodRequests();
      fetchProfile();
    }
  }, [dispatch, user]);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    setIsButtonBlurred(!isButtonBlurred);
  };

  const toggleDetailsVisibility = () => {
    setShowDetails(!showDetails);
    setIsButtonBlurred(!isButtonBlurred);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="home">
      <div className="containerAllProfile">
        <div className="stats">
          <h3>HI {firstName}</h3>
        </div>
        <div className={`buttonContainer ${isButtonBlurred ? "blurred" : ""}`}>
          <button
            className={`requestButton ${showForm ? "active" : ""}`}
            onClick={toggleFormVisibility}
          >
            <div>
              <img src={DonateIcon} alt="Donate icons" />
              <span>Donate</span>
            </div>
          </button>
          <button
            className={`detailsButton ${showDetails ? "active" : ""}`}
            onClick={toggleDetailsVisibility}
          >
             <div>
              <img src={RequestIcon} alt="Request icon" />
              <span>Request</span>
            </div>
          </button>
          <button className="historyButton">
            <div>
              <img src={HistoryIcon} alt="history icon" />
              <span>History</span>
            </div>
          </button>
        </div>
      </div>
      <div className="containerHome">
        {showForm && <BloodRequestForm onClose={handleFormClose} />}
        <div className="bloodRequests">
          {showDetails &&
            bloodRequests &&
            bloodRequests.map((bloodRequest) => (
              <BloodRequestDetails
                key={bloodRequest._id}
                bloodRequest={bloodRequest}
              />
            ))}
        </div>
      </div>
      <ProfileComponent />
    </div>
  );
};

export default Home;
