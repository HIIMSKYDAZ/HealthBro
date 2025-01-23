import React, { useState, useEffect } from "react";
import "./HomeMain.css";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";
import NewsTicker from "../NewsTicker";
const HomeMain = () => {
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
