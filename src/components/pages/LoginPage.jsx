import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button'; 
import "../Button.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256"; 

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 // const [userData, setUserData] = useState(null);
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    const saltResponse = await axios.post(`http://localhost:5000/api/Login/SaltRequest/${name}`);
    const salt = saltResponse.data;
    const tmpHash = sha256(password + salt.toString()).toString();

    const body = {
      loginName: name,
      tmpHash: tmpHash,
    };

    const loginResponse = await axios.post("http://localhost:5000/api/Login", body);

    if (loginResponse.status === 200) {
      const { token, name, email } = loginResponse.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      const response = await axios.get(`http://localhost:5000/SingleUser/${token}`);

      if (response.status === 200 && response.data && response.data.id) {
        localStorage.setItem("UserId", response.data.id);
        navigate("/HomeMain");
      } else {
        throw new Error("Felhasználói adatok nem találhatóak a válaszban.");
      }
    } else {
      setError("Sikertelen bejelentkezés!");
    }
  } catch (err) {
    console.error("Hiba történt:", err);
    setError("Hibás felhasználónév vagy jelszó!");
  }
};
  
  

  return (
    <>
      <video src="../videos/herobg.mp4" autoPlay loop muted />
      <div>
        <div className="mask d-flex align-items-center justify-content-center container-fluid mx-auto mt-3 mb-3">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-3">
                    <h2 className="text-uppercase text-center mb-4">Belépés</h2>
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    <form > 
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control form-control-sm"
                          required
                        />
                        <label className="form-label" htmlFor="name">Név</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control form-control-sm"
                          required
                        />
                        <label className="form-label" htmlFor="password">Jelszó</label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button onClick={handleSubmit} className="btn--primary btn--medium">Belépés</Button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Nincs fiókod?{" "}
                        <Link to="/signup">
                          <u>Regisztrálj most!</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
