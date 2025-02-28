import React, { useState, useEffect } from "react";
import "./Filter.css";
import axios from "axios";

const Filter = ({ onFilter, currentFilter }) => {
  const [search, setSearch] = useState('');
  const [muscleGroups, setMuscleGroups] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/api/Exercises`);
        const exercises = response.data;
        
        const uniqueMuscleGroups = Array.from(
          new Set(exercises.map(exercise => exercise.muscleGroup))
        );
        
        setMuscleGroups(uniqueMuscleGroups);
      } catch (error) {
        console.error("Hiba:", error);
      }
    };
    fetchWorkouts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilter({ search: value, muscleGroup: currentFilter });
  };

  const handleMuscleGroup = (value) => {
    onFilter({ search, muscleGroup: value });
  };

  return (
    <div className="filter__container">
      <div className="filter">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Keresés..."
        />
        <div className="filter__radios">
          {muscleGroups.map((group, index) => (
            <div key={index}>
              <input
                type="radio"
                id={group}
                name="musclegroup"
                value={group}
                checked={currentFilter === group}
                onChange={(e) => handleMuscleGroup(e.target.value)}
              />
              <label htmlFor={group}>{group}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
