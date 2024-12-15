import React , { useState } from "react";
import "./HomeMain.css";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from '../Button';
import { CiLogout } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { HiMiniCog6Tooth } from "react-icons/hi2";
import "../Button.css";
const HomeMain = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)
  return (
    <div className="homemain-container">
      <div className="sidebar">
        <video src='../videos/mainbg_small.mp4' autoPlay loop muted/>
        <Link to="/HomeMain" className='img-fluid'>
          <img src="images/logo_feher.svg" alt="logo" style={{ width: "50%" }} />
        </Link>
        <div className="menu">
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li><Link to={"/HomeMain"} className="menu_link"> Kezdőlap <FaHouse /></Link></li>
        <li><Link to={"/Edzes"} className="menu_link"> Edzés <FaDumbbell /></Link></li>
        <li><Link to={"/Profile"} className="menu_link"> Profil <IoMdMore /></Link></li>
        <li><Link to={"/Beallitasok"} className="menu_link"> Beállítások <HiMiniCog6Tooth /></Link></li>
        <li><Link to={"/login"} className="menu_link"> Kijelentkezés <CiLogout /></Link></li>
        </ul>
        </div>
        <div className="logout">
        </div>
      </div>

      <div className="content">
        <h2>Napi tudnivalók</h2>
        <p>Töltsd le a mobil appot!</p>
        <p>MOST</p>

      </div>
    </div>
  );
};

export default HomeMain;

