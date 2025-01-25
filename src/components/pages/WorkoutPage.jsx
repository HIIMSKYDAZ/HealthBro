import {React,useEffect,useState} from "react";
import Sidebar from "../SideBar";
import "./HomeMain.css";
import { Button } from '../Button'; 
import { useNavigate } from "react-router-dom";
import WorkoutCards from"../WorkoutCards.jsx";


export const WorkoutPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      if (!token) {
        navigate("/AccessDenied");
      }
    }, [navigate]);
   
    return(
        <div className="homemain-container">
            <Sidebar></Sidebar>
            <div className="content">
                <div style={{position: "absolute", top: 0, right: 0}}>
                    <Button linkTo={"/"}>Új terv létrehozása</Button>
                </div>
                <h1>Workout</h1>
                <div className="row-hb">
  {Array(6).fill(0).map((_, index) => (
    <a href="/workoutpage" key={index}>
      <WorkoutCards imageSrc="../images/user1.jpg" cardName={`Workout ${index + 1}`} />
    </a>
  ))}
</div>
            </div>
        </div>
    );
}