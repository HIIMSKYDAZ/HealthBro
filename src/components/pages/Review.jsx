    import React, { useState, useEffect } from "react";
    import "./Review.css";
    import Sidebar from "../SideBar";
    import { useNavigate } from "react-router-dom";
    import axios from "axios";

    const Review = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // SessionStorage-ból betöltjük a felhasználónevet és a profilképet
    const [felhasznaloNev, setFelhasznaloNev] = useState("");
    const [profilePicturePath, setProfilePicturePath] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        if (!token) {
        navigate("/AccessDenied");
        }

        const storedUsername = localStorage.getItem("name") || "";
        const storedProfilePicture = localStorage.getItem("profilePicturePath") || "";

        setFelhasznaloNev(storedUsername);
        setProfilePicturePath(storedProfilePicture);
    }, [navigate]);

    const handleReviewSubmit = async () => {
        if (review.trim() === "") {
        setMessage("Kérjük, írjon egy véleményt!");
        return;
        }
    
        if (!felhasznaloNev) {
        setMessage("Hiba: Nem található felhasználónév!");
        return;
        }
    
        console.log("Sending review:", review);
    
        try {
        const response = await axios.post("https://localhost:5000/api/Review", {
            felhasznaloNev,
            velemeny: review, 
            profilePicturePath,
        });
            console.log(response)
        setMessage("Vélemény sikeresen rögzítve!");
        setReview("");
        } catch (error) {
        setMessage("Hiba történt a vélemény mentése során.");
        }
    };
    

    return (
        <div className="homemain-container">
        <Sidebar />
        <div className="content">
            <div className="review-section">
            <h3>Írjon véleményt!</h3>
            <textarea
                className="review-textarea"
                placeholder="Írja le véleményét itt..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button onClick={handleReviewSubmit} className="submit-btn">
                Vélemény felvitele
            </button>
            {message && <p className="message">{message}</p>}
            </div>
        </div>
        </div>
    );
    };

    export default Review;
