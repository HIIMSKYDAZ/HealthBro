import React, { useEffect, useState } from "react";
import Filter from "../Filter.jsx";
import axios from "axios";
import ExerciseList from "../ExerciseList.jsx";
import MainList from "../MainList.jsx";
import { useParams } from "react-router-dom";
import { Button } from "../Button.js";
import "./WorkoutPlanSingle.css";

const WorkoutPlanSingle = () => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const planId = useParams().id;

  const handleUpdateExercises = (updatedExercises) => {
    setSelectedExercises(updatedExercises);
  };

  const uploadExercises = async () => {
    try {
      // Ellenőrizzük, hogy van-e kiválasztott gyakorlat
      if (!selectedExercises || selectedExercises.length === 0) {
        alert("Nincsenek kiválasztott gyakorlatok!");
        return;
      }
  
      // Átalakítjuk az adatokat a megfelelő formátumba
      const exercisesToUpload = selectedExercises.map(exercise => ({
        planId: parseInt(planId),
        exerciseId: exercise.exerciseId, // Feltételezve, hogy az exercise objektum tartalmaz id-t
        sets: exercise.sets || 0,
        weight: exercise.weight || 0,
        reps: exercise.reps || 0
      }));
  
      // PUT kérés küldése a backendnek
      const response = await axios.put(
        `https://localhost:5000/UpdatePlanExercises/${planId}`,
        exercisesToUpload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Sikeres mentés!");
        window.location.reload();
      } else {
        console.error("Hiba a mentés során:", response);
        alert("Hiba a mentés során.");
      }
    } catch (error) {
      console.error("Hiba történt a mentés során:", error);
      alert("Hiba a mentés során: " + error.message);
    }
  };

  const FillExercises = async () => {
    try {
      const response = await axios.get(`https://localhost:5000/PlanId/${planId}`, {
        params: {
          muscleGroup: selectedMuscleGroup || undefined,
        },
      });
      setSelectedExercises(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FillExercises();
  }, [selectedMuscleGroup]);

  const handleAddExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      sets: 3,
      weight: 0,
      reps: 10
    };
    setSelectedExercises((prev) => [...prev, newExercise]);
  };

  const handleRemoveExercise = (index) => {
    setSelectedExercises((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="homemain-container-wps">
        <div className="filter-container">
          <Filter onFilter={setSelectedMuscleGroup} currentFilter={selectedMuscleGroup} />
        </div>

        <div className="mainlist-container">
          <MainList
            exercises={selectedExercises ? selectedExercises : []}
            onRemoveExercise={handleRemoveExercise}
            onUpdateExercise={handleUpdateExercises}
          />
        </div>

        <div className="exercise-list-container">
          <ExerciseList muscleGroupFilter={selectedMuscleGroup} onAddExercise={handleAddExercise} />
        </div>

        {/* Minden eszközön rögzített mentés gomb */}
        <div className="save-button-container">
          <button className="save-button" onClick={uploadExercises}>Mentés</button>
        </div>
      </div>
    </>
  );
};

export default WorkoutPlanSingle;