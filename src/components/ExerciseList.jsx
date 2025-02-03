import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ExerciseList.css";

const ExerciseList = ({ muscleGroupFilter, onAddExercise }) => {
    const [exercises, setExercises] = useState([]);
    
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                console.log("Fetching exercises for muscle group:", muscleGroupFilter);
                const response = await axios.get('https://localhost:5000/api/Exercises', {
                    params: { 
                        muscleGroup: muscleGroupFilter || null 
                    }
                });
                console.log("API response:", response.data);
                setExercises(response.data);
            } catch (error) {
                console.error("Hiba történt:", error.response || error);
                // Ideiglenes fejlesztői visszajelzés
                setExercises([{
                    id: 1,
                    name: "Teszt gyakorlat",
                    muscleGroup: "mell",
                    description: "Példa adat"
                }]);
            }
        };
    
        fetchExercises();
    }, [muscleGroupFilter]);

    return (
        <div className="exercise-list">
            {exercises.map(exercise => (
                <div key={exercise.id} className="exercise-item">
                    <span className="exercise-name">{exercise.name}</span>
                    <button 
                        className="add-button"
                        onClick={() => onAddExercise(exercise)}
                        title="Hozzáadás"
                    >
                        +
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExerciseList;