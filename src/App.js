import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage.jsx";
import ContactPage from "./ContactPage.jsx";


//geci
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} /> {/* Ideiglenes kezdőoldal */}
          <Route path="/about" exact element={<AboutPage />} />
          <Route path="/contact" exact element={<ContactPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

