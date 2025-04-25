import React, { useEffect, useState } from 'react';
import './Notification.css';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
    const [appointmentData, setAppointmentData] = useState(null);
    const [loading, setLoading] = useState(true);  // 🔥 new loading state

    useEffect(() => {
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
        setLoading(false);   // 🔥 mark loading complete
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

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>Loading...</h2>  {/* optional */}
                </div>
            ) : appointmentData ? (
                <div className="appointment-notification">
                    <h3>Appointment Confirmed ✅</h3>
                    <p><strong>Doctor:</strong> {appointmentData.doctor}</p>
                    <p><strong>Patient:</strong> {appointmentData.name}</p>
                    <p><strong>Phone:</strong> {appointmentData.phone}</p>
                    <p><strong>Date:</strong> {appointmentData.date}</p>
                    <p><strong>Time:</strong> {appointmentData.time}</p>
                    <button onClick={handleCancel} className="cancel-btn">Cancel Appointment</button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2>No Appointments Found</h2>
                </div>
            )}
        </div>
    );
};

export default Notification;
