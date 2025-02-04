import React, { useEffect, useState } from "react";
import Filter from "../Filter.jsx";
import axios from "axios";
import ExerciseList from "../ExerciseList.jsx";
import MainList from "../MainList.jsx";
import { useParams } from "react-router-dom";

    // Gyakorlat hozzáadása a főlistához
    const WorkoutPlanSingle = () => {
      const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
      const [selectedExercises, setSelectedExercises] = useState([]);
      const planId = useParams().id;
  
      const handleUpdateExercises = (updatedExercises) => {
          setSelectedExercises(updatedExercises);
      };

        const FillExercises = async() => {
            const response = await axios.get(`https://localhost:5000/api/Planexercise/plan/${planId}`, {
                params: {
                    muscleGroup: selectedMuscleGroup || undefined
                }
            });
            setSelectedExercises(response.data);
        }
        
        useEffect(() => {
            FillExercises();
        }, [selectedMuscleGroup]);
    
        // Gyakorlat hozzáadása
        const handleAddExercise = (exercise) => {
            setSelectedExercises(prev => [...prev, exercise]);
        };
    
        // Gyakorlat eltávolítása
        const handleRemoveExercise = (index) => {
            setSelectedExercises(prev => prev.filter((_, i) => i !== index));
        };
    
        return (
            <div className="homemain-container-wps">
              <div className="filter-container">
                <Filter onFilter={setSelectedMuscleGroup} currentFilter={selectedMuscleGroup} />
              </div>
          
              <div className="mainlist-container">
                <MainList exercises={selectedExercises} onRemoveExercise={handleRemoveExercise} onUpdateExercise={handleUpdateExercises}/>
              </div>
          
              <div className="exercise-list-container">
                <ExerciseList muscleGroupFilter={selectedMuscleGroup} onAddExercise={handleAddExercise} />
              </div>
            </div>
          );
    };

export default WorkoutPlanSingle;