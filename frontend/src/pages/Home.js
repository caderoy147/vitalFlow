import React, { useState, useEffect } from "react";
import { useBloodRequestsContext } from "../hooks/useBloodRequestsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import BloodRequestDetails from "../components/BloodRequestDetails";
import BloodRequestForm from "../components/BloodRequestForm";

// Import the SVG icon
import DonateIcon from "../assets/icons/bx_donate-blood.svg";
import RequestIcon from "../assets/icons/material-symbols_search.svg";
import HistoryIcon from "../assets/icons/tabler_book.svg";

const Home = () => {
  const { bloodRequests, dispatch } = useBloodRequestsContext();
  const { user } = useAuthContext();

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isButtonBlurred, setIsButtonBlurred] = useState(false);

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

    if (user) {
      fetchBloodRequests();
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
          <h3>HI Benedict</h3>
        </div>
        <div className={`buttonContainer ${isButtonBlurred ? "blurred" : ""}`}>
          <button
            className={`requestButton ${showForm ? "active" : ""}`}
            onClick={toggleFormVisibility}
          >
            <div>
              <img src={DonateIcon} alt="Donate icon" />
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
    </div>
  );
};

export default Home;
//hi