import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/Landing_Page';
import Sign_Up from './components/Sign_Up/Sign_Up';
import Login from './components/Login/Login';
import InstantConsultation from './components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './components/FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './components/DoctorCard/DoctorCard';
import Notification from './components/Notification/Notification';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instant" element={<InstantConsultation />} />
        <Route path="/find-doctor" element={<FindDoctorSearch />} />
        <Route path="/notification" element={<Notification />} />

        {/* One page with 3 DoctorCards */}
        <Route
          path="/doctors-card"
          element={
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
              <DoctorCard
                name="Dr. Aisha Khan"
                speciality="Neurologist"
                experience={10}
                ratings="4.8"
              />
              <DoctorCard
                name="Dr. Rohit Sharma"
                speciality="Cardiologist"
                experience={15}
                ratings="4.6"
              />
              <DoctorCard
                name="Dr. Sneha Mehta"
                speciality="Dermatologist"
                experience={8}
                ratings="4.9"
              />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
