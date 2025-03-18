import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ExerciseList.css";

const ExerciseList = ({ filters, onAddExercise }) => {
    const [allExercises, setAllExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
  
    useEffect(() => {
      const fetchExercises = async () => {
        try {
          const response = await axios.get('https://localhost:5000/api/Exercises', {
            params: { 
              // Módosítottuk a paraméterküldést
              muscleGroup: filters.muscleGroup.length > 0 
                ? filters.muscleGroup.join(',') 
                : undefined
            }
          });
          setAllExercises(response.data);
        } catch (error) {
          console.error("Hiba:", error);
          setAllExercises([]);
        }
      };
      fetchExercises();
    }, [filters.muscleGroup]);
  
    useEffect(() => {
      const filtered = allExercises.filter(exercise => {
        // Javított szűrési logika
        const matchesMuscleGroup = filters.muscleGroup.length === 0 || 
          filters.muscleGroup.includes(exercise.muscleGroup);
        
        const matchesSearch = exercise.name.toLowerCase()
          .includes(filters.search.toLowerCase());
        
        return matchesMuscleGroup && matchesSearch;
      });
      
      setFilteredExercises(filtered);
    }, [allExercises, filters]);
  
    return (
      <div className="exercise-list-container">
        <div className="exercise-scrollable">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="exercise-item">
              <span className="exercise-name">{exercise.name}</span>
              <button 
                className="add-button"
                onClick={() => onAddExercise({
                  ...exercise,
                  sets: 3,
                  weight: '',
                  reps: 12,
                  completed: false
                })}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default ExerciseList;