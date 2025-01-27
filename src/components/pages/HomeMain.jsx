import React, { useState, useEffect } from "react";
import "./HomeMain.css";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";
import NewsTicker from "../NewsTicker";
import axios from "axios";
const HomeMain = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!token) {
      navigate("/AccessDenied");
    }
    
  }, [navigate]);
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
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("loginName", response.data.loginName);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("profilePicturePath", response.data.profilePicturePath);
        localStorage.setItem("email",response.data.email)
        console.log(localStorage.getItem("id"));
        console.log(response.data);

        
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      }
    };
  
    fetchUserData();
  }, [navigate]);
 

  return (
    <div className="homemain-container">
      <video src="../videos/mainbg_small.mp4" autoPlay loop muted />
      <Sidebar />
      <div className="content">
        <NewsTicker />
      </div>
    </div>
  );
};

export default HomeMain;
