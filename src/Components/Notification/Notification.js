// src/components/Notification/Notification.js
import React, { useEffect, useState } from 'react';
import './Notification.css';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    // Doctor info and appointment info stored in localStorage
    const storedDoctor = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointment = storedDoctor
      ? JSON.parse(localStorage.getItem(storedDoctor.name))
      : null;

    if (storedAppointment) {
      setAppointmentData({
        doctor: storedDoctor?.name || 'Unknown Doctor',
        name: storedAppointment.name,
        phone: storedAppointment.phone,
        date: storedAppointment.date,
        time: storedAppointment.time
      });
    }
  }, []);

  const handleCancel = () => {
    if (appointmentData?.doctor) {
      localStorage.removeItem(appointmentData.doctor);
      setAppointmentData(null);
    }
  };

  return (
    <div>
      <Navbar />
      {children}

      {appointmentData && (
        <div className="appointment-notification">
          <h3>Appointment Confirmed ✅</h3>
          <p><strong>Doctor:</strong> {appointmentData.doctor}</p>
          <p><strong>Patient:</strong> {appointmentData.name}</p>
          <p><strong>Phone:</strong> {appointmentData.phone}</p>
          <p><strong>Date:</strong> {appointmentData.date}</p>
          <p><strong>Time:</strong> {appointmentData.time}</p>
          <button onClick={handleCancel} className="cancel-btn">Cancel Appointment</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
