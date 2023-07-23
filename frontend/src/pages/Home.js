import React, { useState, useEffect, useRef } from 'react';
import { useBloodRequestsContext } from '../hooks/useBloodRequestsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import BloodRequestDetails from '../components/BloodRequestDetails';
import BloodRequestForm from '../components/BloodRequestForm';


import axios from 'axios';

//icons
import DonateIcon from '../assets/icons/bx_donate-blood.svg';
import RequestIcon from '../assets/icons/material-symbols_search.svg';
import HistoryIcon from '../assets/icons/tabler_book.svg';
import CalendarIcon from '../assets/icons/calendar.svg';
import CheckMarkIcon from '../assets/icons/checkmark.svg';
import BloodDropIcon from '../assets/icons/blooddrop.svg';

const Home = () => {
  const { bloodRequests, dispatch } = useBloodRequestsContext();
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isButtonBlurred, setIsButtonBlurred] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [bloodBagsDonated, setBloodBagsDonated] = useState(0);
  const [available, setAvailable] = useState("");
  const [donationCooldown, setDonationCooldown] = useState("");
  const componentRef = useRef(null);


  useEffect(() => {
    const fetchBloodRequests = async () => {
      const response = await fetch('/api/bloodRequests', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_BLOODREQUESTS', payload: json });
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
        setBloodBagsDonated(response.data.bloodBagsDonated);
        setAvailable(response.data.available);
        setDonationCooldown(response.data.donationCooldown);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchBloodRequests();
      fetchProfile();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (showForm || showDetails) {
      // Scroll to the component when it is shown
      componentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showForm, showDetails]);

  const toggleFormVisibility = () => {
    setShowDetails(!showDetails);
    setShowForm(false); // Hide the BloodRequestForm
    setIsButtonBlurred(!isButtonBlurred);
  };

  const toggleDetailsVisibility = () => {
    setShowForm(!showForm);
    setShowDetails(false); // Hide the BloodRequestDetails
    setIsButtonBlurred(!isButtonBlurred);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleCloseAllDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="home">
      <div className="containerAllProfile">
        <div className="stats">
          <div className="Name">
            <h3>Hi,</h3>
            <h3>{firstName}</h3>
          </div>
          <div className="statsData">
            <div className="bloodBag">
              <img src={BloodDropIcon} alt="Donate icon" />
              <h2>{bloodBagsDonated} Blood Bags </h2>
            </div>
            <div className="avail">
              <img src={CheckMarkIcon} alt="Donate icon" />
              <h2>{available ? 'AVAILABLE' : 'NOT AVAILABLE'}</h2>
            </div>
            <div className="calendarNext">
              <img src={CalendarIcon} alt="Donate icon" />
              <h2>{donationCooldown} DAYS</h2>
            </div>
          </div>
        </div>
        <div className={`buttonContainer ${isButtonBlurred ? 'blurred' : ''}`}>
          <button
            className={`requestButton ${showDetails ? 'active' : ''}`}
            onClick={toggleDetailsVisibility}
          >
            <div>
              <img src={RequestIcon} alt="Request icon" />
              <span>Request</span>
            </div>
          </button>
          <button
            className={`detailsButton ${showForm ? 'active' : ''}`}
            onClick={toggleFormVisibility}
          >
            <div>
              <img src={DonateIcon} alt="Donate icon" />
              <span>Donate</span>
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
        <div className="bloodRequests" ref={componentRef}>
          {showDetails && bloodRequests.length > 0 && (
            <>
              <button className="exit-button" onClick={handleCloseAllDetails}>
                  Close All
                </button>
              <div className="details-container">
                <div className="details-scroll">
                  {bloodRequests.map((bloodRequest) => (
                    <BloodRequestDetails
                      key={bloodRequest._id}
                      bloodRequest={bloodRequest}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {showForm && <BloodRequestForm onClose={handleFormClose} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
