import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ExerciseList.css";

const ExerciseList = ({ filters, onAddExercise }) => {
    const [allExercises, setAllExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
  
    useEffect(() => {
      const fetchExercises = async () => {
        try {
          const response = await axios.get('https://healthbro-zkhz.onrender.com/api/Exercises');
          setAllExercises(response.data);
        } catch (error) {
          console.error("Hiba:", error);
          setAllExercises([]);
        }
      };
      fetchExercises();
    }, []);
  
    useEffect(() => {
      if (!Array.isArray(allExercises)) return;
      
      const filtered = allExercises.filter(exercise => {
        // Izomcsoport szűrés
        const muscleGroupMatches = 
          !filters.muscleGroup || 
          filters.muscleGroup.length === 0 || 
          filters.muscleGroup.includes(exercise.muscleGroup);
        
        // Kereső szűrés
        const searchMatches = 
          !filters.search || 
          exercise.name.toLowerCase().includes(filters.search.toLowerCase());
        
        return muscleGroupMatches && searchMatches;
      });
      
      setFilteredExercises(filtered);
    }, [allExercises, filters]);
  
    return (
      <div className="exercise-list-container">
        <div className="exercise-scrollable">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <div key={exercise.id} className="exercise-item">
                <span className="exercise-name">{exercise.name}</span>
                <button 
                  className="add-button"
                  onClick={() => onAddExercise({
                    ...exercise,
                    exerciseId: exercise.exerciseId,
                    sets: 3,
                    weight: '',
                    reps: 12,
                    completed: false
                  })}
                >
                  +
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">Nincs találat</div>
          )}
        </div>
      </div>
    );
  };

export default ExerciseList;