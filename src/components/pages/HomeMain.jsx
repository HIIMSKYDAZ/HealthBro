import React, { useState, useEffect } from "react";
import "./HomeMain.css";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";
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
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <iframe title="News"
            src="https://rss.app/embed/v1/list/tCZVo0Vc458IJp7H" 
            frameBorder="0" 
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
