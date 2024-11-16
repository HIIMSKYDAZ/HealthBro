import React from "react";
import NavBar from "./components/NavBar.js";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage.jsx";
import Home from "./components/pages/Home";


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

