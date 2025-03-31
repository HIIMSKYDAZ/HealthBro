import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Popup.css";

const Popup = ({ isOpen, onClose, onPostSuccess }) => {
  const [planName, setPlanName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const validateAndPost = async () => {
    // Check if planName is empty
    if (!planName.trim()) {
      setErrorMessage("Kérlek add meg az edzésterv nevét!");
      return;
    }

    // Clear any existing error
    setErrorMessage("");

    try {
      const userId = localStorage.getItem("UserId");
      const token = localStorage.getItem("token");
      await axios.post(
        "https://localhost:5000/api/Workoutplan",
        {
          userId: userId,
          planName: planName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onPostSuccess(); // Notify successful POST
      onClose(); // Close popup
    } catch (error) {
      console.error("Error posting workout:", error);
      setErrorMessage("Hiba történt az edzésterv létrehozásakor!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onClose}
      className="popup-overlay"
    >
      <motion.div 
        className="popup-card" 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <h1 className="popup-title">Új edzésterv létrehozása</h1>
        <div className="popup-input-container">
          <input
            type="text"
            placeholder="Írd be az edzésterv nevét"
            className="popup-input"
            value={planName}
            onChange={(e) => {
              setPlanName(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
          />
          {errorMessage && <div className="popup-error-message">{errorMessage}</div>}
        </div>
        <div className="popup-actions">
          <button className="popup-cancel-button" onClick={onClose}>Mégsem</button>
          <button className="popup-button" onClick={validateAndPost}>Létrehozás</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;