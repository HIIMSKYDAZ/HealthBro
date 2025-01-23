import React, { useState, useEffect } from "react";
import "../EditProfile.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar";
import axios from "axios";

const EditProfile = ({ theme }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [name, setName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios.post("http://localhost:5000/api/FileUpload/BackEndServer", formData)
        .then((response) => {
          if (response.data !== "default.jpg") {
            setImagePath(response.data);
            setProfileImage(URL.createObjectURL(file)); 
            axios.post("http://localhost:5000/api/FileUpload/FtpServer", formData)
              .then((ftpResponse) => {
                if (ftpResponse.data !== "default.jpg") {
                 // console.log("Sikeres kép feltöltés ftp szerverre.");
                } 
              })
          } 
        })
    }
  };
  

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Nincs bejelentkezve.");
      return;
    }
    const updatedUserData = {
      name: name, 
      profilePicturePath: imagePath
    };
    axios.put(`http://localhost:5000/api/User/UpdateUser/${token}`, updatedUserData,{
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  )
  .then(response=>{
    alert("Sikeres módosítás")
    //console.log("Sikeres módosítás",response.data);
  })
  .catch(error=>{
    //console.log("Hiba történt",error);
  })

    
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!token) {
      navigate("/AccessDenied");
    }
  }, [navigate]);

  return (
    <div className="edit-profile-container">
      <Sidebar />

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
            />
          </div>
          <button type="submit">Mentés</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
