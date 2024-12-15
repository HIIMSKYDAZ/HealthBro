import React, { useState, useEffect } from "react";
import "../EditProfile.css";

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
        setProfileImage(reader.result);  // A fájl URL-t állítja be
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
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave} className="edit-profile-form">
        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" onChange={handleImageChange} />
          {profileImage && <img src={profileImage} alt="Profile" className="profile-image-preview" />}
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            required
          />
        </div>

        <button type="submit" className="btn-save">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
