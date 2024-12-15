import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../EditProfile.css";
import { CiLogout } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { FaHouse, FaDumbbell } from "react-icons/fa6";
import { HiMiniCog6Tooth } from "react-icons/hi2";

const EditProfile = ({ theme }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profil sikeresen frissítve!");
  };

  return (
    <div className="edit-profile-container">
      <div className="sidebar">

        <Link to="/HomeMain" className="img-fluid">
          <img src="images/logo_feher.svg" alt="logo" style={{ width: "50%" }} />
        </Link>

        <div className="menu">
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8-9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM0 416c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z" />
              </svg>
            )}
          </div>

          <ul className={click ? "menu-icon-main active" : "menu-icon-main"}>
            <li onClick={closeMobileMenu}>
              <Link to="/HomeMain" className="menu_link">
                Kezdőlap <FaHouse />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/Edzes" className="menu_link">
                Edzés <FaDumbbell />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/profile" className="menu_link">
                Profil <IoMdMore />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/Settings" className="menu_link">
                Beállítások <HiMiniCog6Tooth />
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link to="/login" className="menu_link">
                Kijelentkezés <CiLogout />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="edit-profile-content">
        <h2>Profil szerkesztése</h2>
        <form onSubmit={handleSave} className="edit-profile-form">
          <div className="form-group">
            <label>Profil kép</label>
            <input type="file" onChange={handleImageChange} />
            {profileImage && <img src={profileImage} alt="Profile" className="profile-image-preview" />}
          </div>

          <div className="form-group">
            <label>Név</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add meg a neved"
              required
            />
          </div>

          <div className="form-group">
            <label>Leírás</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Mit lehet tudni rólad?"
              required
            />
          </div>

          <button type="submit">Mentés</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
