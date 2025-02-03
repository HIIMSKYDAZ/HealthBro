import React, { useState, useEffect } from "react";
import "../ProfilePage.css";
import "./HomeMain.css"
import { Button } from "../Button";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/AccessDenied");
        return;
      }
  
      try {
        const response = await axios.get(`https://localhost:5000/SingleUser/${token}`);
        setUserData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      }
    };
  
    fetchUserData();
  }, [navigate]);

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-content">
        <div className="profile-header">

            <img src={userData?.profilePicturePath ? `http://healthbro.nhely.hu/users/${userData.profilePicturePath}` : "http://healthbro.nhely.hu/default.jpg"} 
              alt="Profile"
              width="200"
              height="200"
            />

          <div className="profile-info">
            <h2>{userData?.name}</h2>
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
                <h4>0 perc</h4>
                <p>Eddig</p>
              </div>

              <div className="stat-reps">
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
