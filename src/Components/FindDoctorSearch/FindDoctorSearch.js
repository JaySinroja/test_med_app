import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const specialities = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearch = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSelect = (speciality) => {
    setSearchInput(speciality);
    setShowResults(false);
    navigate(`/instant-consultation?speciality=${speciality}`);
    window.location.reload(); // optional
  };

  return (
    <div className="find-doctor-wrapper">
      <h2>Find a Doctor</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by specialty"
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className={`search-dropdown ${showResults ? '' : 'hidden'}`}>
          {specialities
            .filter((s) =>
              s.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((speciality) => (
              <div
                key={speciality}
                className="search-item"
                onMouseDown={() => handleSelect(speciality)}
              >
                <span>{speciality}</span>
                <span className="label">Speciality</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FindDoctorSearch;
