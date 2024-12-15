import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Settings.css";
import { Button } from '../Button';
import { CiLogout } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";

const Settings = ({ theme, toggleTheme }) => {
  const [unitSystem, setUnitSystem] = useState({
    distance: "KM",
    length: "CM",
    weight: "KG",
  });

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  const toggleUnit = (type) => {
    setUnitSystem((prev) => ({
      ...prev,
      [type]:
        prev[type] === "KM" || prev[type] === "CM" || prev[type] === "KG"
          ? type === "distance"
            ? "MILE"
            : type === "length"
            ? "INCH"
            : "LBS"
          : type === "distance"
          ? "KM"
          : type === "length"
          ? "CM"
          : "KG",
    }));
  };

  return (
    <div className={`settings-container`}>
      <div className="sidebar">
              <Link to="/HomeMain" className='img-fluid'>
                  <img src='images/logo.png' alt='logo' style={{ width: '50%', textAlign: 'center' }}/>
              </Link>
              <div className="menu">
                  <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
                      Home<FaHouse />
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
              <div className="logout">
              </div>
            </div>
      <h2 className={theme === "light" ? "text-light" : "text-dark"}>Settings</h2>

      <div className="settings-section">
        <h3 className={theme === "light" ? "text-light" : "text-dark"}>Units</h3>
        <div className="setting-option">
          <span className={theme === "light" ? "text-light" : "text-dark"}>Distance:</span>
          <button
            onClick={() => toggleUnit("distance")}
            className={theme === "light" ? "btn-light" : "btn-dark"}
          >
            {unitSystem.distance}
          </button>
        </div>
        <div className="setting-option">
          <span className={theme === "light" ? "text-light" : "text-dark"}>Length:</span>
          <button
            onClick={() => toggleUnit("length")}
            className={theme === "light" ? "btn-light" : "btn-dark"}
          >
            {unitSystem.length}
          </button>
        </div>
        <div className="setting-option">
          <span className={theme === "light" ? "text-light" : "text-dark"}>Weight:</span>
          <button
            onClick={() => toggleUnit("weight")}
            className={theme === "light" ? "btn-light" : "btn-dark"}
          >
            {unitSystem.weight}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3 className={theme === "light" ? "text-light" : "text-dark"}>Theme</h3>
        <div className="setting-option">
          <span className={theme === "light" ? "text-light" : "text-dark"}>Mode:</span>
          <button
            onClick={toggleTheme}
            className={theme === "light" ? "btn-light" : "btn-dark"}
          >
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="back-button">
        <Link to="/HomeMain">
          <button className={theme === "light" ? "btn-light" : "btn-dark"}>
            Vissza
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
