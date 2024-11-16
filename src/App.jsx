import React from "react";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import AboutPage from "./components/pages/AboutPage.jsx";
import Home from "./components/pages/Home";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";


//geci
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact Component={Home}/> {/* Ideiglenes kezdőoldal */}
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/contact" exact element={<ContactPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

