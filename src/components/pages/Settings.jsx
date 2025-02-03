import React, { useState, useEffect } from "react";
import "../Settings.css";
import "./HomeMain.css";
import axios from "axios";
import Sidebar from "../SideBar";
import { useNavigate } from "react-router-dom";
import crypto from "crypto-js";  // crypto-js könyvtár importálása

const Settings = () => {
  const [unitSystem, setUnitSystem] = useState({
    distance: "KM",
    length: "CM",
    weight: "KG",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      const response = await axios.post("https://localhost:5000/api/User/SaveUnits", {
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
    const token = localStorage.getItem("token");
    const loginName = localStorage.getItem("loginName"); 
    console.log(localStorage.getItem("loginName"));
  
    if (!token || !loginName) {
      alert("Nincs bejelentkezve.");
      return;
    }
  
    if (!password || !newPassword || !confirmNewPassword) {
      alert("Kérjük, töltse ki az összes jelszó mezőt.");
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      alert("A jelszavak nem egyeznek.");
      return;
    }
  
    try {
      const response = await axios.post(
        `https://localhost:5000/${loginName},${password},${newPassword}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Sikeres jelszómódosítás!");
      } else if (response.status === 201) {
        alert("Hibás a régi jelszó!");
      } else {
        alert("Hiba történt a jelszómódosítás során.");
      }
    } catch (error) {
      console.error("Hiba történt:", error);
      alert("Hiba történt a jelszómódosítás során.");
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Nincs bejelentkezve.");
      return;
    }

    const updatedUserData = { Email: email };

    try {
      const response = await axios.put(`https://localhost:5000/api/User/UpdateUserMail/${token}`, updatedUserData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("Sikeres módosítás");
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!token) {
      navigate("/AccessDenied");
    }
  }, [navigate]);

  return (
    <div className="settings-page">
      <Sidebar />

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