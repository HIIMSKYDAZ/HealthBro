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
      <div className="sidebar">
        <Link to="/HomeMain" className="img-fluid">
          <img src="images/logo_feher.svg" alt="logo" style={{ width: "50%" }} />
        </Link>

        <div className="menu">
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8-9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM0 416c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z" />
              </svg>
            )}
          </div>

          <ul className={click ? "menu-icon-main active" : "menu-icon-main"}>
            <li onClick={closeMobileMenu}>
              <Link to="/HomeMain" className="menu_link">
                Kezdőlap <FaHouse />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/Edzes" className="menu_link">
                Edzés <FaDumbbell />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/profile" className="menu_link">
                Profil <IoMdMore />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/Settings" className="menu_link">
                Beállítások <HiMiniCog6Tooth />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/login" className="menu_link">
                Kijelentkezés <CiLogout />
              </Link>
            </li>
          </ul>
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
