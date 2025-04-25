import React, { useEffect, useState } from 'react';
import './Notification.css';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData.name))
      : null;

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    } else {
      setShowNotification(false); // Hide if appointment doesn't exist (cancelled)
    }
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="notification-content">
            <h3>Appointment Confirmed</h3>
            <p><strong>Patient:</strong> {username}</p>
            <p><strong>Doctor:</strong> {doctorData?.name}</p>
            <p><strong>Date:</strong> {appointmentData.date}</p>
            <p><strong>Time:</strong> {appointmentData.time}</p>
            <button
              onClick={() => {
                localStorage.removeItem(doctorData.name);
                setShowNotification(false);
              }}
              className="cancel-button"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
