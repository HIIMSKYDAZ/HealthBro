import React from "react";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import AboutPage from "./components/pages/AboutPage.jsx";
import Home from "./components/pages/Home";
import ContactPage from "./components/pages/ContactPage.jsx";
import Services from "./components/pages/Services.jsx";
import Signup from "./components/pages/SignupPage.jsx";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact Component={Home}/> {/* Ideiglenes kezdőoldal */}
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/contact" exact element={<ContactPage />}></Route>
          <Route path="/services" exact element={<Services />}></Route>
          <Route path="/sign-up" exact element={<Signup />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;