import React from 'react';
import './WorkoutCards.css';

const WorkoutCards = ({ imageSrc, cardName, onDelete, planId }) => {
  const handleDelete = (e) => {
    e.preventDefault(); // Prevent the parent link click
    e.stopPropagation();
    if (onDelete) {
      onDelete(planId);
    }
  };

  return (
    <div className="card-hb">
      <div className="card-image-container">
        <img src={imageSrc} alt={cardName} className='img-fluid' />
        <div className="card-overlay">
          <button 
            className="delete-button"
            onClick={handleDelete}
            aria-label="Delete workout plan"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="card-content">
        <h3>{cardName}</h3>
        <div className="card-badge">Edzésterv</div>
      </div>
    </div>
  );
};

export default WorkoutCards;