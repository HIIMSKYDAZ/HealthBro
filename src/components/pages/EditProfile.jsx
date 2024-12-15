import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../EditProfile.css"; // CSS stílus importálása
import { Button } from '../Button';
import { FaDumbbell } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FaHouse } from "react-icons/fa6";

const EditProfile = ({ theme }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

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
        <Link to="/HomeMain" className='img-fluid'>
          <img src='images/logo.png' alt='logo' style={{ width: '50%', textAlign: 'center' }} />
        </Link>
        <div className="menu">
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/HomeMain">
            Home <FaHouse />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/">
            Edzés <FaDumbbell />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/profile">
            Profil <IoMdMore />
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/Settings">
            Beállítások
          </Button>
          <Button buttonStyle="btn--primary" buttonSize="btn--medium" linkTo="/login">
            Kijelentkezés <CiLogout />
          </Button>
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
