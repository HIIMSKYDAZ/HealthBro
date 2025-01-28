import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleFilter = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilter(value);
  }

  return (
    <div className="filter__container">
    <div className="filter">
      <input type="text" value={search} onChange={handleFilter} placeholder="Keresés..."/>
      <div className="filter__radios">
        <label className="radio-container">
          <input type="radio" name="muscle" value="beginner" checked={difficulty === 'beginner'}  />
          <span className="radio-checkmark"></span>
          Kezd
        </label>
        <label className="radio-container">
          <input type="radio" name="muscle" value="intermediate" checked={difficulty === 'intermediate'}  />
          <span className="radio-checkmark"></span>
          K z szint
        </label>
        <label className="radio-container">
          <input type="radio" name="muscle" value="advanced" checked={difficulty === 'advanced'}  />
          <span className="radio-checkmark"></span>
          Halad
        </label>
      </div>
    </div>
    </div>
  )
}

export default Filter;

