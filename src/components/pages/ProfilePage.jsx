import React, { useState } from "react";
import "../ProfilePage.css"; // Hozz létre egy CSS fájlt a stílusokhoz
import { Button } from "../Button";

const ProfilePage = () => {
  // Állapotok a statisztikákhoz
  const [duration, setDuration] = useState(0); // Kezdetben 0 perc
  const [reps, setReps] = useState(0); // Kezdetben 0 ismétlés

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-picture"></div>
        <div className="profile-info">
          <h2>Profil név</h2>
          
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/edit-profile">
            Edit Profile
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
            vissza
          </Button>
        </div>
      </div>

      <div className="profile-body">
        <div className="statistics">
          <h3>Statistics</h3>
          <div className="tabs">
            <button>Duration</button>
            <button>Reps</button>
          </div>
          <div className="stat-content">
            <div className="stat-duration">
              <h4>{duration} min</h4>
              <p>This week</p>
            </div>

            <div className="stat-reps">
              <h4>{reps} reps</h4>
              <p>This week</p>
            </div>


          </div>
          <div className="chart"> 
              <p>Chart placeholder</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
