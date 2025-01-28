import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AboutPage from "./components/pages/AboutPage.jsx";
import Home from "./components/pages/Home";
import ContactPage from "./components/pages/ContactPage.jsx";
import Services from "./components/pages/Services.jsx";
import Signup from "./components/pages/SignupPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import HomeMain from "./components/pages/HomeMain.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import Settings from "./components/pages/Settings.jsx";
import EditProfile from "./components/pages/EditProfile.jsx";
import AccessDenied from "./components/pages/AccessDenied.jsx";
import { WorkoutPage } from "./components/pages/WorkoutPage.jsx";
import WorkoutPlanSingle from "./components/pages/WorkoutPlanSingle.jsx";

function App() {
  const [theme, setTheme] = useState("light");


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <Main theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

function Main({ theme, toggleTheme }) {
  const location = useLocation();

  return (
    <div className={theme === "light" ? "light-mode" : "dark-mode"}>
      {location.pathname !== "/HomeMain" && location.pathname !== "/profile" && location.pathname !== "/Settings" && location.pathname !== "/EditProfile"&& location.pathname !== "/Profile" && location.pathname !== "/WorkoutPlan" && !location.pathname.includes("/WorkoutPlanSingle") && (
        <NavBar theme={theme} toggleTheme={toggleTheme} />
      )}
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/about" exact element={<AboutPage/>} />
        <Route path="/contact" exact element={<ContactPage />} />
        <Route path="/services" exact element={<Services />} />
        <Route path="/sign-up" exact element={<Signup />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/homeMain" exact element={<HomeMain />} />
        <Route path="/profile" exact element={<ProfilePage />} />
        <Route path="/settings" exact element={<Settings />} />
        <Route path="/EditProfile" exact element={<EditProfile />} />
        <Route path="/WorkoutPlan" exact element={<WorkoutPage/>}/>
        <Route path="/AccessDenied" exact element={<AccessDenied/>}/>
        <Route path="/WorkoutPlanSingle/:id" exact element={<WorkoutPlanSingle/>}/>
      </Routes>
    </div>
  );
}

export default App;
