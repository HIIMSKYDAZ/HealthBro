import React, { useState, useEffect } from "react";
import "./Filter.css";
import axios from "axios";

const Filter = ({ onFilter, currentFilter }) => {
  const [search, setSearch] = useState('');
  const [musclegroup, setMusclegroup] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/api/Exercises`);
        const exercises = response.data;

        // Egyedi izomcsoportok kigyűjtése
        const uniqueMuscleGroups = Array.from(
          new Set(exercises.map((exercise) => exercise.muscleGroup))
        );

        setMusclegroup(uniqueMuscleGroups);
      } catch (error) {
        console.error("Hiba történt az edzéstervek lekérésekor:", error);
      }
    };

    fetchWorkouts();
  }, []); // Csak egyszer fusson le

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearch(value);
    //onFilter(value);
  };

  return (
    <div className="filter__container">
      <div className="filter">
        <input
          type="text"
          value={search}
          onChange={handleFilter}
          placeholder="Keresés..."
        />
        <div className="filter__radios">
          {musclegroup.map((muscleGroup, index) => (
            <div key={index}>
              <input
                type="radio"
                id={muscleGroup}
                name="musclegroup"
                value={muscleGroup}
                checked={currentFilter === muscleGroup.value}
                onChange={(e) => onFilter(e.target.value)}
              />
              <label htmlFor={muscleGroup}>{muscleGroup}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
