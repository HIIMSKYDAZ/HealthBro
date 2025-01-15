import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button'; 
import "../Button.css";
import { Link, useNavigate } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";


function AccesDenied() {

  const navigate = useNavigate();
 // const [userData, setUserData] = useState(null);

 const handleSubmit = async (e) => {

  navigate("/");
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
                    <h2 className="text-uppercase text-center mb-4">Nincs bejelentkezve!</h2>
                    <div className="d-flex justify-content-center">
                        <Button onClick={handleSubmit} className="btn--primary btn--medium">Főoldal</Button>
                    </div>                 
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

export default AccesDenied;
