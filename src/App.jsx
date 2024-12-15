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
      {location.pathname !== "/HomeMain" && location.pathname !== "/profile" && location.pathname !== "/Settings" && (
        <NavBar theme={theme} toggleTheme={toggleTheme} />
      )}
      <Routes>
        <Route path="/" exact element={<Home theme={theme} />} />
        <Route path="/about" exact element={<AboutPage theme={theme} />} />
        <Route path="/contact" exact element={<ContactPage theme={theme} />} />
        <Route path="/services" exact element={<Services theme={theme} />} />
        <Route path="/sign-up" exact element={<Signup theme={theme} />} />
        <Route path="/login" exact element={<LoginPage theme={theme} />} />
        <Route path="/homeMain" exact element={<HomeMain theme={theme} />} />
        <Route path="/profile" exact element={<ProfilePage theme={theme} />} />
        <Route path="/settings" exact element={<Settings theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/EditProfile" exact element={<EditProfile theme={theme} />} />
      </Routes>
    </div>
  );
}

export default App;
