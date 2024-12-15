import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../ProfilePage.css"; 
import { Button } from "../Button";
import {FaDumbbell } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const ProfilePage = () => {  
  const [duration, setDuration] = useState(0); 
  const [reps, setReps] = useState(0); 

  return (
    <div className="profile-page">
      <div className="sidebar">
        <Link to="/HomeMain" className='img-fluid'>
          <img src='images/logo.png' alt='logo' style={{ width: '50%', textAlign: 'center' }} />
        </Link>
        <div className="menu">
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
            Home
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/">
            Edzés<FaDumbbell />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
            Profil<IoMdMore />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/Settings">
            <Link to="/Settings" className='img-fluid'>
              Beálítások 
            </Link>
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/login">
            Kijelentkezés<CiLogout />
          </Button>
        </div>
      </div>


      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-picture"></div>
          <div className="profile-info">
            <h2>Profil név</h2>
            
            <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/EditProfile">
              Profil szerkesztése
            </Button>

          </div>
        </div>

        <div className="profile-body">
          <div className="statistics">
            <h3>Statisztika</h3>
            <div className="stat-content">
              <div className="stat-duration">
                <h4>{duration} perc</h4>
                <p>Eddig</p>
              </div>

              <div className="stat-reps">
                <h4>{reps} ismétlés</h4>
                <p>Eddig</p>
              </div>
            </div>
            <div className="chart">
              <p>Diagramm helye</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
