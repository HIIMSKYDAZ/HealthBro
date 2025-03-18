import React, { useEffect, useState } from "react";
import Filter from "../Filter.jsx";
import axios from "axios";
import ExerciseList from "../ExerciseList.jsx";
import MainList from "../MainList.jsx";
import { useParams } from "react-router-dom";
import "./WorkoutPlanSingle.css";

const WorkoutPlanSingle = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [filters, setFilters] = useState({ muscleGroup: [], search: '' });
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const planId = useParams().id;

  // Mobil nézet detektálása
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilter = (newFilters) => setFilters(newFilters);

  const handleUpdateExercises = (updatedExercises) => {
    setSelectedExercises(updatedExercises);
  };

  const uploadExercises = async () => {
    try {
      if (!selectedExercises?.length) {
        alert("Nincsenek kiválasztott gyakorlatok!");
        return;
      }

      const exercisesToUpload = selectedExercises.map(exercise => ({
        planId: parseInt(planId),
        exerciseId: exercise.exerciseId,
        sets: exercise.sets || 0,
        weight: exercise.weight || 0,
        reps: exercise.reps || 0
      }));

      await axios.put(
        `https://localhost:5000/UpdatePlanExercises/${planId}`,
        exercisesToUpload,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Sikeres mentés!");
      window.location.reload();
    } catch (error) {
      alert("Hiba: " + error.message);
    }
  };

  const FillExercises = async () => {
    try {
      const response = await axios.get(`https://localhost:5000/PlanId/${planId}`, {
        params: {
          muscleGroup: filters.muscleGroup.join(','),
          search: filters.search
        }
      });
      setSelectedExercises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FillExercises();
  }, [filters]);

  const handleAddExercise = (exercise) => {
    const newExercise = { ...exercise, sets: 3, weight: 0, reps: 10 };
    setSelectedExercises(prev => [...prev, newExercise]);
    if (isMobile) setShowExerciseModal(false);
  };

  const handleRemoveExercise = (index) => {
    setSelectedExercises(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="homemain-container-wps">
      {/* Asztali elrendezés */}
      <div className="desktop-layout">
        <div className="filter-container">
          <Filter onFilter={handleFilter} currentFilter={filters.muscleGroup} />
        </div>
        
        <div className="mainlist-container">
          <MainList
            exercises={selectedExercises || []}
            onRemoveExercise={handleRemoveExercise}
            onUpdateExercise={handleUpdateExercises}
          />
        </div>

        <div className="exercise-list-container">
          <ExerciseList 
            filters={filters}
            onAddExercise={handleAddExercise} 
          />
        </div>
      </div>

      {/* Mobil elrendezés */}
      <div className="mobile-layout">
        <div className="mobile-top">
          <div className="filter-container">
            <Filter onFilter={handleFilter} currentFilter={filters.muscleGroup} />
          </div>
          <div className="exercise-list-container">
            <ExerciseList 
              filters={filters}
              onAddExercise={handleAddExercise} 
            />
          </div>
        </div>
        
        <div className="mainlist-container">
          <MainList
            exercises={selectedExercises || []}
            onRemoveExercise={handleRemoveExercise}
            onUpdateExercise={handleUpdateExercises}
          />
        </div>
      </div>

      {/* Közös gombok */}
      <div className="save-button-container">
        <button className="back-button" onClick={historyBack}>←</button>
        <button className="save-button" onClick={uploadExercises}>Mentés</button>
      </div>
    </div>
  );
};

export default WorkoutPlanSingle;