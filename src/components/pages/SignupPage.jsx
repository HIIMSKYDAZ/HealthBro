import { React } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPages.css";
import { Button } from '../Button';

function SignupPage() {
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

                  <form>
                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-sm"
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Felhasználónév
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-sm"
                      />
                      <label className="form-label" htmlFor="form3Example3cg">
                        Email
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-sm"
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Jelszó
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-3">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-sm"
                      />
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Jelszó Újra
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3g"
                      >
                        Elfogadom az{" "}
                        <a href="#!" className="text-body">
                          <u>Altalános szerződést</u>
                        </a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <Button
                        className='btns'
                        buttonStyle='btn--primary'
                        buttonSize='btn--medium'
                      >Regisztráció</Button>
                    </div>

                    <p className="text-center text-muted mt-4 mb-0">
                      Már van fiókod?{" "}
                      <Link to="/login">
                        <u>Bejelentkezés</u>
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

