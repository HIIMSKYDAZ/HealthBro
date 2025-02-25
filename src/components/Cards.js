import React, { useState, useEffect } from "react";
import axios from "axios";
import CardItem from './CardItem.js'
import './Cards.css'

function Cards() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      axios
        .get("https://localhost:5000/api/Review")
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Hiba az adatok lekérésekor:", error);
        });
    }, []);
  return (
    <div className='cards'>
        <h1 style={{color: "black"}}>Vásárlók</h1>
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                {reviews.map((review, index) => (
              <CardItem
                key={index}
                src={`http://healthbro.nhely.hu/users/${review.profilePicturePath}`}
                text={review.velemeny}
                label='Vélemény'
                path="/services"
              />
            ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards