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
      await selectedExercises.map(async (exercise) => {
        await axios.post("https://localhost:5000/Planexercise",exercise)
      });
    } catch (error) {
      console.log(error);
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
    setSelectedExercises((prev) => [...prev, exercise]);
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
      </div>

      {/* Mobil mentés gomb */}
      <div className="mobile-button-container">
        <Button className="save-button" onClick={uploadExercises}>Mentés</Button>
      </div>
    </>
  );
};

export default WorkoutPlanSingle;