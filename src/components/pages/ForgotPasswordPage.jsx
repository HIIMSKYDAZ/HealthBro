import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button'; 
import "../Button.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handlePasswordReset = async () => {
    setMessage(null);
    setError(null);

    try {
      // Itt az URL paraméterként küldöd az emailt
      const response = await axios.post(`https://localhost:5000/ForgotPassword/${encodeURIComponent(email)}`);

      if (response.status === 200) {
        setMessage("Ha az e-mail cím létezik, küldtünk egy jelszó-visszaállítási linket.");
      } else {
        setError("Hiba történt a kérés feldolgozása során.");
      }
    } catch (err) {
      setError("Hiba történt! Ellenőrizd az e-mail címet.");
    }
  };

  return (
    <>
      <video src="../videos/herobg.mp4" autoPlay loop muted />
      <div>
    <div className="mask d-flex align-items-center justify-content-center container-fluid mx-auto mt-3 mb-3">
      <div className="card p-4" style={{ maxWidth: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-3">Elfelejtett jelszó</h2>
        {message && <div className="alert alert-success text-center">{message}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <div className="form-group mb-3">
          <label htmlFor="email">E-mail cím</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button onClick={handlePasswordReset} className="btn--primary btn--medium w-100">
          Jelszó visszaállítása
        </Button>
        <p className="text-center mt-3">
          <p className="text-center text-muted mt-5 mb-0">
            <Link to="/login">
              <u>Vissza a bejelentkezéshez</u>
            </Link>
          </p>
        </p>
      </div>
    </div>
    </div>
    </>
  );
}

export default ForgotPasswordPage;
