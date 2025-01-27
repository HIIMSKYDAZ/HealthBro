import React from 'react';
import './WorkoutCards.css';

const WorkoutCards = ({ imageSrc, cardName }) => {
    return (
      <div className="card-hb">
        <img src={imageSrc} alt={cardName} style={{ width: "100%", height: "auto" }} />
        <div style={{ padding: "8px", backgroundColor: "#f4f4f4" }}>{cardName}</div>
      </div>
    );
  };

export default WorkoutCards;