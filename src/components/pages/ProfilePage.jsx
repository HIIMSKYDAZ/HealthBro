import React, { useState, useEffect } from "react";
import "../ProfilePage.css"; 
import { Button } from "../Button";
import Sidebar from "../SideBar";
import {useNavigate } from "react-router-dom";
const ProfilePage = () => {  
  //const [duration, setDuration] = useState(0); 
 // const [reps, setReps] = useState(0); 
  //const [click, setClick] = useState(false);
 // const handleClick = () => setClick(!click);
 // const closeMobileMenu = () => setClick(false);
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const navigate = useNavigate();
 useEffect(() => {
   const token = localStorage.getItem("token");
   setIsAuthenticated(!!token);
   if (!token) {
     navigate("/AccessDenied");
   }
 }, [navigate]);



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
                {/* <h4>{duration} perc</h4> */}
                <h4>0 perc</h4>
                <p>Eddig</p>
              </div>

              <div className="stat-reps">
                {/*<h4>{reps} ismétlés</h4>*/}
                <h4>0 ismétlés</h4>
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
