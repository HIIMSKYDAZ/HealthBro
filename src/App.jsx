import React from "react";
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

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <>
      {/* Csak akkor jelenik meg a NavBar, ha az útvonal nem "/homeMain" */}
      {location.pathname !== "/HomeMain" && location.pathname !== "/profile" && <NavBar />}
      <Routes>
        <Route path="/" exact Component={Home} /> {/* Ideiglenes kezdőoldal */}
        <Route path="/about" exact element={<AboutPage />} />
        <Route path="/contact" exact element={<ContactPage />} />
        <Route path="/services" exact element={<Services />} />
        <Route path="/sign-up" exact element={<Signup />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/homeMain" exact element={<HomeMain />} />
        <Route path="/profile" exact element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
