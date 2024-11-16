import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact/>
        </Switch>
      </Router>
    </>
  );
}

export default App;

