import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button';

function LoginPage() {
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
  
                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-sm"
                        />
                        <label
className="form-label"    
htmlFor="form3Example3cg"
                                            >
                                                Email
                        </label>
                      </div>

                        <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-sm"
                        />
                        <label
className="form-label"
htmlFor="form3Example4cg"
>
                          Jelszó
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                      <Button
                      buttonStyle="btn--primary"
                      buttonSize="btn--large"
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
  
  
