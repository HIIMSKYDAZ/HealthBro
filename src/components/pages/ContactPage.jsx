import React from "react";
import { CiInstagram } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";

function ContactUs() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Align closer to the top
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff", // Light background
      }}
    >
      <h1 style={{ fontSize: "2.5em", marginTop: "30px" }}>Lépjen kapcsolatba velünk</h1>
      <p style={{ fontSize: "1.2em", color: "#555", maxWidth: "600px", marginTop: "10px" }}>
      Vegye fel velünk a kapcsolatot, szeretnénk hallani rólad! Azért vagyunk itt, hogy segítsünk vagy válaszoljunk bármilyen kérdésre.
      </p>

      <div style={{ margin: "20px 0" }}>
        <h2 style={{ fontSize: "1.5em" }}>Email:</h2>
        <p style={{ fontSize: "1.2em", color: "#000" }}>hello@HealthBro.com</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "1.5em" }}>Socials:</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            fontSize: "2em", // Larger icons
          }}
        >
          {/* Instagram */}
          
          <a
            href="https://instagram.com"
            style={{
              textDecoration: "none",
              color: "#000", // Black color for icons
            }}
            target="_blank"
            rel="noreferrer"
          >
            <CiInstagram />
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com"
            style={{
              textDecoration: "none",
              color: "#000",
            }}
            target="_blank"
            rel="noreferrer"
          >
           <CiTwitter />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            style={{
              textDecoration: "none",
              color: "#000",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <SlSocialFacebook />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
