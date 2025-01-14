import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Settings.css";
import { CiLogout } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import axios from "axios"; // Make sure to import axios for API calls
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import Sidebar from "../SideBar";

const Settings = () => {
  const [unitSystem, setUnitSystem] = useState({
    distance: "KM",
    length: "CM",
    weight: "KG",
  });
  const [click, setClick] = useState(false);

  // State for email and password change
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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

  const handleSaveUnits = async () => {
    try {
      // Replace this URL with your API endpoint for saving the units
      const response = await axios.post("http://localhost:5000/api/User/SaveUnits", {
        units: unitSystem,
      });

      if (response.status === 200) {
        setSuccess("A mértékegységek sikeresen elmentve!");
      } else {
        setError("Hiba történt a mértékegységek mentése során.");
      }
    } catch (error) {
      setError("Hiba történt a mértékegységek mentése során.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (newPassword !== confirmNewPassword) {
      setError("A két új jelszó nem egyezik!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/User/ChangePassword", {
        oldPassword: password,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        setSuccess("A jelszó sikeresen megváltozott!");
      } else {
        setError("Hiba történt a jelszó módosítása során.");
      }
    } catch (error) {
      setError("Hiba történt a jelszó módosítása során.");
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/User/ChangeEmail", {
        email: email,
      });

      if (response.status === 200) {
        setSuccess("Az email cím sikeresen megváltozott!");
      } else {
        setError("Hiba történt az email cím módosítása során.");
      }
    } catch (error) {
      setError("Hiba történt az email cím módosítása során.");
    }
  };

  return (
    <div className="settings-page">
      <Sidebar></Sidebar>

      <div className="settings-content">
        <div className="settings-header">
          <h2>Beállítások</h2>
        </div>

        <div className="settings-body">
          <div className="settings-section">
            <h3>Mértékegységek</h3>
            <div className="setting-option">
              <span>Távolság:</span>
              <button onClick={() => toggleUnit("distance")} className="unit-btn">
                {unitSystem.distance}
              </button>
            </div>
            <div className="setting-option">
              <span>Hossz:</span>
              <button onClick={() => toggleUnit("length")} className="unit-btn">
                {unitSystem.length}
              </button>
            </div>
            <div className="setting-option">
              <span>Súly:</span>
              <button onClick={() => toggleUnit("weight")} className="unit-btn">
                {unitSystem.weight}
              </button>
            </div>
            <button onClick={handleSaveUnits} style={{ width: "10rem" }} className="save-units-btn">
              Mértékegységek mentése
            </button>
          </div>

          <div className="settings-section">
            <h3>Felhasználói adatok módosítása</h3>

            {/* Email Change */}
            <div className="setting-option">
              <span>Email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <button onClick={handleEmailChange} style={{ width: "10rem" }} className="unit-btn">
                Email módosítása
              </button>
            </div>

            {/* Password Change */}
            <div className="setting-option">
              <span>Jelszó:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Régi jelszó"
              />
            </div>
            <div className="setting-option">
              <span>Új jelszó:</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input-field"
                placeholder="Új jelszó"
              />
            </div>
            <div className="setting-option">
              <span>Új jelszó újra:</span>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="input-field"
                placeholder="Új jelszó újra"
              />
            </div>
            <button onClick={handlePasswordChange} style={{ width: "10rem" }} className="unit-btn">
              Jelszó módosítása
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default Settings;
