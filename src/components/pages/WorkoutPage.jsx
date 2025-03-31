import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar";
import "./HomeMain.css";
import { useNavigate } from "react-router-dom";
import WorkoutCards from "../WorkoutCards.jsx";
import axios from "axios";
import Popup from "../Popup.jsx";
import PolygonBackground from '../PolygonBackground.jsx';

export const WorkoutPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
        
        // Prevent horizontal scrolling when component mounts
        document.body.style.overflowX = 'hidden';
        
        // Cleanup function
        return () => {
            document.body.style.overflowX = '';
        };
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

    const handleDeleteWorkout = async (planId) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt az edzéstervet?")) {
            setIsDeleting(true);
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`https://localhost:5000/api/Workoutplan/${planId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Refresh the workout list
                fetchWorkouts();
            } catch (error) {
                console.error("Error deleting workout plan:", error);
                alert("Hiba történt a törlés során!");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handlePostSuccess = () => {
        fetchWorkouts(); // Refresh the workout list
    };

    return (
        <div className="homemain-container">
            <PolygonBackground />
            <Sidebar />
            <div className="content">
                <div className="header">
                    <div style={{ position: "absolute", top: 0, right: 0 }}>
                        <button
                            className="new-plan-button responsive-button"
                            onClick={() => setIsPopupOpen(true)}
                        >
                            Új terv létrehozása
                        </button>
                    </div>
                    <h1 className="fancy-text">Edzéstervek</h1>
                </div>
                
                {isDeleting && (
                    <div className="loading-overlay">
                        <div className="loading-spinner"></div>
                    </div>
                )}
                
                <div className="row-hb">
                    {workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <a className="a-hb" href={`/WorkoutPlanSingle/${workout.planId}`} key={index}>
                                <WorkoutCards 
                                    imageSrc={workout.imageUrl || "../images/default.jpg"} 
                                    cardName={workout.planName}
                                    planId={workout.planId}
                                    onDelete={handleDeleteWorkout}
                                />
                            </a>
                        ))
                    ) : (
                        <div className="no-workouts-message">
                            Még nincs edzésterved. Kattints az "Új terv létrehozása" gombra a kezdéshez!
                        </div>
                    )}
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