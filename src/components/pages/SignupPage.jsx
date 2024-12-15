import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import axios from "axios";
import { Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    loginName: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("A jelszavak nem egyeznek!");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7263/api/Register/Register", {
        loginName: formData.loginName,
        email: formData.email,
        password: formData.password,
        name: formData.loginName,
      });
      

      if (response.status === 200) {
        setSuccess("Sikeres regisztráció! Most bejelentkezhetsz.");
      }
    } catch (error) {
      console.error(error); 
      setError(
        error.response?.data || "Hiba történt a regisztráció során. Próbáld újra!"
      );
    }
  };

  return (
    <>
      <video src="../videos/herobg.mp4" autoPlay loop muted />
      <div className="mask d-flex align-items-center justify-content-center container-fluid mx-auto mt-3 mb-3">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-5 col-xl-4">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-3">
                  <h2 className="text-uppercase text-center mb-4">
                    Regisztráció
                  </h2>

                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success text-center">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-3">
                      <input
                        type="text"
                        id="loginName"
                        value={formData.loginName}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        required
                      />
                      <label className="form-label" htmlFor="loginName">
                        Felhasználónév
                      </label>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        required
                      />
                      <label className="form-label" htmlFor="password">
                        Jelszó
                      </label>
                    </div>

                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                        required
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        Jelszó Újra
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        Elfogadom az{" "}
                        <a href="#!" className="text-body">
                          <u>Általános szerződést</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm btn-block"
                      >
                        Regisztráció
                      </button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">
                      Már van fiókod?{" "}
                      <Link to="/login">
                        <u style={{ color: "black" }}>Bejelentkezés</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
