import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../ProfilePage.css"; 
import { Button } from "../Button";
import {FaDumbbell } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import {FaHouse} from "react-icons/fa6";
import Sidebar from "../SideBar";

const ProfilePage = () => {  
  const [duration, setDuration] = useState(0); 
  const [reps, setReps] = useState(0); 
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className="profile-page">
      <Sidebar></Sidebar>


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
