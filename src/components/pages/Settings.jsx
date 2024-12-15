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
    <div className="settings-page">
      <div className="sidebar">
        <Link to="/HomeMain" className='img-fluid'>
          <img src='images/logo.png' alt='logo' style={{ width: '50%', textAlign: 'center' }} />
        </Link>
        <div className="menu">
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
            Főoldal<FaHouse />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/">
            Edzés<FaDumbbell />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
            Profil<IoMdMore />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/Settings">
            <Link to="/Settings" className='img-fluid'>
              Beállítások 
            </Link>
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/login">
            Kijelentkezés<CiLogout />
          </Button>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-header">
          <h2>Beállítások</h2>
        </div>

        <div className="settings-body">
          <div className="settings-section">
            <h3>Mértékegységek</h3>
            <div className="setting-option">
              <span>Távolság:</span>
              <button
                onClick={() => toggleUnit("distance")}
                className="unit-btn"
              >
                {unitSystem.distance}
              </button>
            </div>
            <div className="setting-option">
              <span>Hossz:</span>
              <button
                onClick={() => toggleUnit("length")}
                className="unit-btn"
              >
                {unitSystem.length}
              </button>
            </div>
            <div className="setting-option">
              <span>Súly:</span>
              <button
                onClick={() => toggleUnit("weight")}
                className="unit-btn"
              >
                {unitSystem.weight}
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>Téma</h3>
            <div className="setting-option">
              <span>Mód:</span>
              <button
                onClick={toggleTheme}
                className="unit-btn"
              >
                {theme === "light" ? "Világos Mód" : "Sötét Mód"} 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
