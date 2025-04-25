import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Save Doctor Data properly
        const doctorData = {
            name: doctorName,          // use "name" key to match Notification.js
            speciality: doctorSpeciality,
        };
        localStorage.setItem('doctorData', JSON.stringify(doctorData));

        // Save Appointment Data
        const appointmentData = {
            name,
            phone: phoneNumber,         // Save "phone" not "phoneNumber" (to match Notification.js)
            date: new Date().toLocaleDateString(), // Adding dummy date and time
            time: new Date().toLocaleTimeString()
        };
        localStorage.setItem(doctorName, JSON.stringify(appointmentData));

        onSubmit(appointmentData);

        setName('');
        setPhoneNumber('');
    };

    console.log("Rendering AppointmentForm");

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default AppointmentForm;
