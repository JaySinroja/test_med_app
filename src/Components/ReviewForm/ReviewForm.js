import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology', feedback: '', isReviewed: false },
    { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology', feedback: '', isReviewed: false }
  ]);

  const [showFormId, setShowFormId] = useState(null);
  const [formData, setFormData] = useState({ name: '', review: '', rating: '' });

  const handleClick = (id) => {
    setShowFormId(id);
    setFormData({ name: '', review: '', rating: '' });
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating) {
      setReviews(reviews.map(r => 
        r.id === showFormId ? { ...r, feedback: `${formData.name}: ${formData.review} (Rating: ${formData.rating}/5)`, isReviewed: true } : r
      ));
      setShowFormId(null);
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <div className="review-form-container">
      <h2>Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.speciality}</td>
              <td>
                <button 
                  onClick={() => handleClick(doc.id)} 
                  disabled={doc.isReviewed}
                  className="feedback-button"
                >
                  {doc.isReviewed ? "Submitted" : "Click Here"}
                </button>
              </td>
              <td>{doc.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFormId && (
        <div className="popup-form">
          <h3>Give Your Review</h3>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
            />
            <label>Review:</label>
            <textarea 
              name="review" 
              value={formData.review} 
              onChange={handleChange} 
            />
            <label>Rating (1-5):</label>
            <input 
              type="number" 
              name="rating" 
              min="1" 
              max="5" 
              value={formData.rating} 
              onChange={handleChange}
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
