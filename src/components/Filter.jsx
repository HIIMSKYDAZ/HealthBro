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
          new Set(exercises.map(exercise => exercise.muscleGroup)
        ));
        
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

  const handleMuscleGroupToggle = (group) => {
    const updatedGroups = currentFilter.includes(group)
      ? currentFilter.filter(g => g !== group)
      : [...currentFilter, group];
    
    onFilter({ search, muscleGroup: updatedGroups });
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
        <div className="filter__groups">
          {muscleGroups.map((group, index) => (
            <div 
              key={index}
              className={`group-item ${currentFilter.includes(group) ? 'active' : ''}`}
              onClick={() => handleMuscleGroupToggle(group)}
            >
              <div className="custom-radio"></div>
              <span>{group}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;