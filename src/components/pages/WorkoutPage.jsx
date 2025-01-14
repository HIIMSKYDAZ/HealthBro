import {React,useEffect,useState} from "react";
import Sidebar from "../SideBar";
import "./HomeMain.css";
import { Button } from '../Button'; 

export const WorkoutPage = () => {

    return(
        <div className="homemain-container">
            <Sidebar></Sidebar>
            <div className="content">
                <div style={{position: "absolute", top: 0, right: 0}}>
                    <Button linkTo={"/"}>Új terv létrehozása</Button>
                </div>
            </div>
        </div>
    );
}