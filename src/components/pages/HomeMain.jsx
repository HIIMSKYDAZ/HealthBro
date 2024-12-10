import React from "react";
import "../HomeMain.css";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '../Button';
import { CiLogout } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { HiMiniCog6Tooth } from "react-icons/hi2";
const HomeMain = () => {
  return (
    <div className="homemain-container">
      <div className="sidebar">
        <Link to="/HomeMain" className='img-fluid'>
            <img src='images/logo.png' alt='logo' style={{ width: '50%', textAlign: 'center' }}/>
        </Link>
        <div className="menu">
            <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
                Home<FaHouse />
            </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
                Edzés<FaDumbbell />
            </Button>
            <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
                Profil<IoMdMore />
            </Button>
            <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
                Beálítások<HiMiniCog6Tooth />
            </Button>
            <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/login">
                Kijelentkezés<CiLogout />
            </Button>
        </div>
        <div className="logout">
        </div>
      </div>

      <div className="content">
        <h2>Napi tudnivalók</h2>
        <p>Töltsd le a mobil appot!</p>
        <p>MOST</p>

      </div>

      <div className="right-panel">
        <div className="profile-info">
          <div className="profile-pic"></div>
          <p>Követők száma: 0</p>
          <Button
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            linkTo="/profile"
            >
        Profil megtekintése<IoMdMore />
        </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
