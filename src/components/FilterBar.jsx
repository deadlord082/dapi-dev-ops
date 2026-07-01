import React, { useState } from 'react';
import '../styles/filterBar.css';

/**
 * Composant pour afficher les filtres de catégories de lieux
 * et l'option d'affichage des places PMR
 */
const FilterBar = ({ activeFilter, onFilterChange, onPMRToggle, showPMR = false }) => {
  const [showPMROption, setShowPMROption] = useState(showPMR);

  const handlePMRToggle = (e) => {
    const checked = e.target.checked;
    setShowPMROption(checked);
    onPMRToggle(checked);
  };

  const filters = [
    { id: 'bank', label: 'Banc', icon: '🪑', color: '#4a90e2' },
    { id: 'restaurant', label: 'Resto', icon: '🍽️', color: '#f5a623' },
    { id: 'parking', label: 'Parking', icon: '🅿️', color: '#7ed321' },
    { id: 'toilet', label: 'Toilettes', icon: '🚻', color: '#bd10e0' },
  ];

  return (
    <div className="filter-bar">
      {/* Option PMR en checkbox */}
      <div className="filter-bar__pmr-option">
        <input
          type="checkbox"
          id="pmr-checkbox"
          className="filter-bar__pmr-checkbox"
          checked={showPMROption}
          onChange={handlePMRToggle}
          aria-label="Afficher les places PMR"
        />
        <label htmlFor="pmr-checkbox" className="filter-bar__pmr-label">
          ♿ Places PMR
        </label>
      </div>

      {/* Autres filtres */}
      <div className="filter-bar__scroll">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-bar__button ${
              activeFilter === filter.id ? 'filter-bar__button--active' : ''
            }`}
            onClick={() => onFilterChange(filter.id)}
            style={
              activeFilter === filter.id
                ? { backgroundColor: filter.color }
                : {}
            }
            aria-label={`Filtre ${filter.label}`}
            title={filter.label}
          >
            <span className="filter-bar__icon">{filter.icon}</span>
            <span className="filter-bar__label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;

