import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainList.css";

const MainList = ({ 
  exercises, 
  onRemoveExercise,
  onUpdateExercise,
  onOpenExerciseModal,
  isMobile,
}) => {
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ellenőrizzük, hogy tényleg tömb-e
  const safeExercises = Array.isArray(exercises) ? exercises : [];

  const handleChange = (index, field, value) => {
    const updated = safeExercises.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onUpdateExercise(updated);
  };

  const toggleCompleted = (index) => {
    const updated = safeExercises.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    );
    onUpdateExercise(updated);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data } = await axios.get('https://localhost:5000/api/Exercises');
        setExerciseList(data);
      } catch (err) {
        setError("Nem sikerült betölteni a gyakorlatokat");
        console.error("API hiba:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExercises();
  }, []);

  if (loading) return <div className="loader">Betöltés...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header-row">
        <div>Gyakorlat</div>
        <div>Széria</div>
        <div>Súly</div>
        <div>Ismétlés</div>
        <div>Állapot</div>
        <div></div>
      </div>

      <div className="content">
        {safeExercises.length === 0 ? (
          <div className="no-exercises">
            Nincsenek gyakorlatok hozzáadva. Használd a {isMobile ? "Gyakorlat hozzáadása gombot" : "jobb oldali panelt"} új gyakorlatok felvételéhez.
          </div>
        ) : (
          safeExercises.map((exercise, index) => {
            // Keressük meg a gyakorlat nevét, ha nem lenne definiálva
            const exerciseName = exercise.name || 
              (exerciseList.find(e => e.id === exercise.exerciseId || e.id === exercise.id)?.name || "Ismeretlen gyakorlat");
            
            return (
              <div key={`${exercise.id || exercise.exerciseId}-${index}`} className="exercise-row">
                <div className="name-cell" data-label="Gyakorlat">
                  {exerciseName}
                </div>

                <div className="sets-cell" data-label="Széria">
                  <input
                    type="number"
                    min="0"
                    value={exercise.sets ?? ""}
                    onChange={(e) => handleChange(index, 'sets', e.target.value)}
                    className="input-number"
                    aria-label="Széria mennyiség"
                  />
                </div>

                <div className="weight-cell" data-label="Súly">
                  <input
                    type="number"
                    min="0"
                    value={exercise.weight ?? ""}
                    onChange={(e) => handleChange(index, 'weight', e.target.value)}
                    className="input-number"
                    placeholder={localStorage.getItem("weightUnit") || "kg"}
                    aria-label="Súly érték"
                  />
                </div>

                <div className="reps-cell" data-label="Ismétlés">
                  <input
                    type="number"
                    min="0"
                    value={exercise.reps ?? ""}
                    onChange={(e) => handleChange(index, 'reps', e.target.value)}
                    className="input-number"
                    aria-label="Ismétlések száma"
                  />
                </div>

                <div className="status-cell" data-label="Állapot">
                  <button
                    className={`state-btn ${exercise.completed ? 'completed' : ''}`}
                    onClick={() => toggleCompleted(index)}
                    aria-label={exercise.completed ? "Teljesítve" : "Nincs teljesítve"}
                  >
                    {exercise.completed ? '✓' : ''}
                  </button>
                </div>

                <div className="delete-cell">
                  <button
                    className="delete-btn"
                    onClick={() => onRemoveExercise(index)}
                    aria-label="Gyakorlat törlése"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })
        )}
        
        {isMobile && (
          <button 
            className="mobile-add-button"
            onClick={onOpenExerciseModal}
          >
            + Új gyakorlat hozzáadása
          </button>
        )}
      </div>
    </div>
  );
};

export default MainList;