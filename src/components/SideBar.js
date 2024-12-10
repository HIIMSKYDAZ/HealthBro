import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { FaHouse, FaDumbbell } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/HomeMain" className="img-fluid">
        <img src="images/logo.png" alt="logo" style={{ width: "50%" }} />
      </Link>
      <div className="menu">
        <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
          Home <FaHouse />
        </Button>
        <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
          Edzés <FaDumbbell />
        </Button>
        <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
          Profil <IoMdMore />
        </Button>
        <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
          Beállítások <HiMiniCog6Tooth />
        </Button>
        <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/login">
          Kijelentkezés <CiLogout />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
