import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button';
import "../Button.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import crypto from "crypto-js";  // crypto-js könyvtár importálása

function SignupPage() {
  const [formData, setFormData] = useState({
    loginName: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const navigate = useNavigate();
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

    const requiredFields = ['loginName', 'email', 'password', 'confirmPassword'];
  const emptyFields = requiredFields.filter(field => !formData[field].trim());

  if (emptyFields.length > 0) {
    setError("Minden mezőt ki kell tölteni!");
    return;
  }

  const termsCheckbox = document.getElementById('terms');
  if (!termsCheckbox.checked) {
    setError("El kell fogadnod az Általános Szerződést!");
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(formData.email)) {
    setError("Érvénytelen email formátum!");
    return;
  }

  if (formData.password.length < 8) {
    setError("A jelszónak legalább 8 karakter hosszúnak kell lennie!");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("A jelszavak nem egyeznek!");
    return;
  }

    const salt = crypto.lib.WordArray.random(16).toString();

    const hash = crypto.SHA256(formData.password + salt).toString();

    try {

      const response = await axios.post("https://healthbro-zkhz.onrender.com/api/Register", {
        id: 0,
        loginName: formData.loginName,
        hash: hash,  
        salt: salt,
        name: formData.loginName,
        permissionId: 0,
        active: false,
        email: formData.email,
        profilePicturePath: ""
      });

      if (response.status === 200) {
        //alert("Sikeres bejelentkezés")
        setSuccess("Sikeres regisztráció! Kérjük, ellenőrizd az emailedet a regisztráció véglegesítéséhez.");
        // Clear form fields
        setFormData({
          loginName: "",
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        });
        //setSuccess("Sikeres regisztráció! Most bejelentkezhetsz.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "Hiba történt a regisztráció során. Próbáld újra!";
      setError(errorMessage);
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
                    <div className="alert alert-danger text-center mb-4">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success text-center mb-4">
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
                    <Button
                      buttonStyle="btn--outline--black"
                      buttonSize="btn--medium"
                      className=""
                      onClick={handleSubmit}
                    >
                      Regisztráció
                    </Button>
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
