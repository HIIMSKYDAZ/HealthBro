import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Popup.css";

const Popup = ({ isOpen, onClose, onPostSuccess }) => {
  // A Hook-ot a komponens elején kell meghívni
  const [planName, setPlanName] = useState("");

  if (!isOpen) return null; // Feltételes visszatérés csak ezután következik

  const postWorkout = async () => {
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
      onPostSuccess(); // Értesítés a sikeres POST-ról
      onClose(); // Popup bezárása
    } catch (error) {
      console.error("Error posting workout:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onClose} // Bezárás háttér kattintásra
      className="popup-overlay"
    >
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <h1 className="popup-title">Új edzéster létrehozása</h1>
        <input
          type="text"
          placeholder="Írd be az edzéster nevét"
          className="popup-input"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
        <button className="popup-button" onClick={postWorkout}>Létrehozás</button>
      </div>
    </motion.div>
  );
};

export default Popup;
