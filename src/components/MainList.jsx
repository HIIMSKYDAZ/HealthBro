import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainList.css";

const MainList = ({ 
  exercises, // Kötelező alapértelmezett érték
  onUpdateExercise = () => {}, 
  onRemoveExercise = () => {}
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
      {exercises.map((exercise, index) => (
  <div key={`${exercise.id}-${index}`} className="exercise-row">
    <div className="name-cell">
    {exercise.name ? exercise.name : exerciseList.find(e => e.exerciseId === exercise.exerciseId).name}
    </div>

    <input
      type="number"
      min="0"
      value={exercise.sets ?? ""}
      onChange={(e) => handleChange(index, 'sets', e.target.value)}
      className="input-number"
    />

    <input
      type="number"
      min="0"
      value={exercise.weight ?? ""}
      onChange={(e) => handleChange(index, 'weight', e.target.value)}
      className="input-number"
      placeholder={localStorage.getItem("weightUnit") || "kg"}
    />

    <input
      type="number"
      min="0"
      value={exercise.reps ?? ""}
      onChange={(e) => handleChange(index, 'reps', e.target.value)}
      className="input-number"
    />

    <button
      className={`state-btn ${exercise.completed ? 'completed' : ''}`}
      onClick={() => toggleCompleted(index)}
    >
      {exercise.completed ? '✓' : '○'}
    </button>

    <button
      className="delete-btn"
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