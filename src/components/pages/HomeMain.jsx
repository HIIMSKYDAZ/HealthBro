import React, { useState } from "react";
import "./HomeMain.css";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar";

const HomeMain = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className="homemain-container">
        <video src="../videos/mainbg_small.mp4" autoPlay loop muted />
        

        <Sidebar></Sidebar>

      <div className="content">
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
    <iframe 
        src="https://rss.app/embed/v1/list/tCZVo0Vc458IJp7H" 
        frameborder="0" 
        style={{ width: "100%", height: "100%" }}>
    </iframe>
</div>
      </div>
    </div>
  );
};

export default HomeMain;