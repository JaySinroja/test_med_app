import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your components
import Navbar from './components/Navbar/Navbar';
import Landing_Page from './components/Landing_Page/Landing_Page';
import Sign_Up from './components/Sign_Up/Sign_Up';
import Login from './components/Login/Login';
import InstantConsultation from './components/InstantConsultationBooking/InstantConsultation'; //  NEW IMPORT
import FindDoctorSearch from './components/FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './components/DoctorCard/DoctorCard';



function App() {
  return (
    
    <BrowserRouter>
      <Navbar /> {/* Navbar stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instant" element={<InstantConsultation />} /> {/*  NEW ROUTE */}
        <Route path="/find-doctor" element={<FindDoctorSearch />} />
        <Route path="/doctor-card" element={<DoctorCard {...sampleDoctor} />} />
        <div>
      <DoctorCard
        name="Dr. Aisha Khan"
        speciality="Neurologist"
        experience={10}
        ratings="4.8"
      />
    </div>

      </Routes>
    </BrowserRouter>
    
  );
  
}

export default App;
