import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button';
import "../Button.css";
import axios from "axios";

function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const getUserData = async (token) => {
        try {
            const response = await axios.get(`https://localhost:7263/api/Login/GetLoggedInUser/${token}`);
            if (response.status === 200) {
                setUserData(response.data); // Beállítja a felhasználói adatokat
                console.log("Bejelentkezett felhasználó adatai:", response.data);
            }
        } catch (error) {
            console.error("Hiba történt a felhasználói adatok lekérésekor:", error.response?.data || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try { //komment
            const response = await axios.post("https://localhost:7263/api/Login", {
                Name: name, // Az új DTO Name mezőjéhez
                Password: password, // Az új DTO Password mezőjéhez
            });

            if (response.status === 200) {
                // Mentse el a JWT-token vagy felhasználói adatokat
                const { token } = response.data;
                localStorage.setItem("authToken", token);

                // Lekérjük a felhasználói adatokat a token alapján
                await getUserData(token);

                // Navigáció a főoldalra
                navigate("/HomeMain");
            }
        } catch (err) {
            setError(
                err.response?.data?.Message ||
                "Hiba történt a bejelentkezés során. Próbáld újra!"
            );
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
                                        <h2 className="text-uppercase text-center mb-4">
                                            Belépés
                                        </h2>

                                        {error && (
                                            <div className="alert alert-danger text-center">
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="form-control form-control-sm"
                                                    required
                                                />
                                                <label
                                                    className="form-label"
                                                    htmlFor="name"
                                                >
                                                    Név
                                                </label>
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
                                                <label
                                                    className="form-label"
                                                    htmlFor="password"
                                                >
                                                    Jelszó
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    type="submit"
                                                    className="btn--primary btn--medium"
                                                >
                                                    Belépés
                                                </Button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">
                                                Nincs Fiókod?
                                                <Link to="/sign-up" className="fw-bold text-body">
                                                    Regisztráció
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
