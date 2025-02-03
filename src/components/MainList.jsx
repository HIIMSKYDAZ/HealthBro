import React from "react";
import axios from "axios";

const MainList = ({ exercises, onUpdateExercise, onRemoveExercise }) => {
    const handleChange = (index, field, value) => {
        const updatedExercises = [...exercises];
        updatedExercises[index][field] = value;
        onUpdateExercise(updatedExercises);
    };

    const getPlanExercises = () => {
        const url = new URLSearchParams(window.location.search);
        const planId = url.get('planId');
        try {
            const response = axios.get(`https://localhost:5000/api/Planexercise/plan/${planId}`);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    };

    const toggleCompleted = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].completed = !updatedExercises[index].completed;
        onUpdateExercise(updatedExercises);
    };

    return (
        <div className="main-list-container">
            <div className="main-list-header">
                <span>Gyakorlat</span>
                <span>Széria</span>
                <span>Súly</span>
                <span>Ismétlés</span>
                <span>Kész</span>
            </div>
            <div className="main-scrollable">
                {exercises.map((exercise, index) => (
                    <div 
                        key={`${exercise.id}-${index}`} 
                        className={`main-list-item ${exercise.completed ? 'completed' : ''}`}
                    >
                        <span className="exercise-name">{exercise.name}</span>
                        
                        <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => handleChange(index, 'sets', e.target.value)}
                            className="sets-input"
                        />
                        
                        <input
                            type="number"
                            value={exercise.weight}
                            onChange={(e) => handleChange(index, 'weight', e.target.value)}
                            className="weight-input"
                            placeholder="kg"
                        />
                        
                        <input
                            type="number"
                            value={exercise.reps}
                            onChange={(e) => handleChange(index, 'reps', e.target.value)}
                            className="reps-input"
                        />
                        
                        <button
                            className={`complete-button ${exercise.completed ? 'completed' : ''}`}
                            onClick={() => toggleCompleted(index)}
                        >
                            {exercise.completed ? '✓' : ''}
                        </button>
                        
                        <button 
                            className="remove-button"
                            onClick={() => onRemoveExercise(index)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainList;