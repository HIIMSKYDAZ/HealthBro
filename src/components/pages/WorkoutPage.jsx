import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar";
import "./HomeMain.css";
import { Button } from "../Button"; 
import { useNavigate } from "react-router-dom";
import WorkoutCards from "../WorkoutCards.jsx";
import axios from "axios";
import Popup from "../Popup.jsx"; // Popup importálása

export const WorkoutPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup állapot
    const navigate = useNavigate();
    const UserId = localStorage.getItem("UserId");

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        if (!token) {
            navigate("/AccessDenied");
        } else {
            fetchWorkouts(token);
        }
    }, [navigate]);

    const fetchWorkouts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`https://localhost:5000/api/Workoutplan/${token}/${UserId}`);
            setWorkouts(response.data);
        } catch (error) {
            console.error("Error fetching workout plans:", error);
        }
    };

    const handlePostSuccess = () => {
        fetchWorkouts(); // Frissítse a workout listát
    };

    return (
        <div className="homemain-container">
            <Sidebar />
            <div className="content">
                <div style={{ position: "absolute", top: 0, right: 0 }}>
                    <button
                        className="new-plan-button"
                        onClick={() => setIsPopupOpen(true)} // Popup megnyitása
                    >
                        Új terv létrehozása
                    </button>
                </div>
                <h1>Workout</h1>
                <div className="row-hb">
                    {workouts.map((workout, index) => (
                        <a className="a-hb" href="/workoutpage" key={index}>
                            <WorkoutCards imageSrc={workout.imageUrl || "../images/default.jpg"} cardName={workout.planName} />
                        </a>
                    ))}
                </div>
            </div>

            {isPopupOpen && (
    <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onPostSuccess={handlePostSuccess} 
    />
)}
        </div>
    );
};
