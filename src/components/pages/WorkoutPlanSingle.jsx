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
  const [searchTerm, setSearchTerm] = useState('');
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
        exerciseId: exercise.exerciseId || exercise.id,
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
      const response = await axios.get(`https://localhost:5000/PlanId/${planId}`);
      setSelectedExercises(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FillExercises();
  }, [planId]);

  const handleAddExercise = (exercise) => {
    const newExercise = { ...exercise, sets: 3, weight: 0, reps: 10 };
    setSelectedExercises(prev => [...prev, newExercise]);
    if (isMobile) setShowExerciseModal(false);
  };

  const handleRemoveExercise = (index) => {
    setSelectedExercises(prev => prev.filter((_, i) => i !== index));
  };

  // Modal nyitásakor reseteljük a keresőt
  const handleOpenModal = () => {
    setSearchTerm('');
    setShowExerciseModal(true);
  };

  // Mobil keresés kezelése
  const handleModalSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Modal bezárás biztosítása
  const closeModal = () => {
    setShowExerciseModal(false);
  };

  // Megakadályozzuk, hogy a modal klikk buborékolása bezárja a modalt véletlenül
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="workout-plan-wrapper">
      {/* Asztali nézet */}
      {!isMobile && (
        <div className="desktop-layout">
          <div className="filter-container">
            <Filter onFilter={handleFilter} currentFilter={filters.muscleGroup} />
          </div>
          
          <div className="mainlist-container">
            <MainList
              exercises={selectedExercises}
              onRemoveExercise={handleRemoveExercise}
              onUpdateExercise={handleUpdateExercises}
              isMobile={isMobile}
            />
          </div>
          
          <div className="exercise-list-container">
            <ExerciseList 
              filters={filters} 
              onAddExercise={handleAddExercise} 
            />
          </div>
        </div>
      )}

      {/* Mobil nézet */}
      {isMobile && (
        <div className="mobile-layout">
          <div className="mainlist-container">
            <MainList
              exercises={selectedExercises}
              onRemoveExercise={handleRemoveExercise}
              onUpdateExercise={handleUpdateExercises}
              isMobile={isMobile}
              onOpenExerciseModal={handleOpenModal}
            />
          </div>

          {/* ExerciseList modal javított verzió */}
          {showExerciseModal && (
            <div className="exercise-modal-overlay" onClick={closeModal}>
              <div className="exercise-modal" onClick={stopPropagation}>
                <div className="modal-header">
                  <div className="search-wrapper">
                    <input
                      type="text"
                      placeholder="Keresés..."
                      value={searchTerm}
                      onChange={handleModalSearch}
                      className="modal-search-input"
                    />
                  </div>
                  <button 
                    className="close-modal-btn"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-exercise-list">
                  <ExerciseList
                    filters={{ search: searchTerm, muscleGroup: filters.muscleGroup }}
                    onAddExercise={handleAddExercise}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Új dizájnú gombok */}
      <div className="control-buttons-container">
        <button className="back-button" onClick={() => window.history.back()}>
          <span className="back-icon">←</span>
          <span className="back-text">Vissza</span>
        </button>
        <button className="save-button" onClick={uploadExercises}>
          <span className="save-icon">✓</span>
          <span className="save-text">Mentés</span>
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanSingle;