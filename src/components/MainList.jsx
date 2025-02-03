import React from "react";
import "./ExerciseList.css";

const MainList = ({ exercises, onRemoveExercise }) => {
    return (
        <div className="main-list">
            <h2>Gyakorlatok</h2>
            {exercises.length === 0 ? (
                <div className="exercise-item">
                    <span>Nincsenek gyakorlatok</span>
                </div>
            ) : (
                exercises.map((exercise, index) => (
                    <div key={`${exercise.id}-${index}`} className="main-list-item">
                        <span className="exercise-name">{exercise.name}</span>
                        <button 
                            className="remove-button"
                            onClick={() => onRemoveExercise(index)}
                            title="Eltávolítás"
                        >
                            ×
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default MainList;