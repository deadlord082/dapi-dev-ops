import React, { useState } from 'react';
import Autocomplete from './Autocomplete';
import '../styles/searchBar.css';

/**
 * Composant de barre de recherche avec autocomplétion
 * Deux champs distincts pour Départ et Arrivée
 */
const SearchBar = ({ onSearch, isLoading, startLocation, endLocation }) => {
  const [departInput, setDepartInput] = useState(startLocation?.address || '');
  const [arriveeInput, setArriveeInput] = useState(endLocation?.address || '');
  const [selectedDepart, setSelectedDepart] = useState(startLocation || null);
  const [selectedArrivee, setSelectedArrivee] = useState(endLocation || null);

  const handleDepartSelect = (suggestion) => {
    setSelectedDepart(suggestion);
    setDepartInput(suggestion.address);
  };

  const handleArriveeSelect = (suggestion) => {
    setSelectedArrivee(suggestion);
    setArriveeInput(suggestion.address);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (selectedDepart && selectedArrivee) {
      onSearch({ depart: selectedDepart, arrivee: selectedArrivee });
    } else if (departInput && arriveeInput) {
      // Recherche libre si pas de suggestion sélectionnée
      onSearch({ depart: { address: departInput }, arrivee: { address: arriveeInput } });
    }
  };

  const handleReset = () => {
    setDepartInput('');
    setArriveeInput('');
    setSelectedDepart(null);
    setSelectedArrivee(null);
  };

  const canSearch = departInput.trim() && arriveeInput.trim();

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={handleSearch}>
        <div className="search-bar__double-input">
          {/* Champ Départ avec Autocomplete */}
          <Autocomplete
            value={departInput}
            onChange={setDepartInput}
            onSelect={handleDepartSelect}
            placeholder="Ex: Place Royale, Nantes"
            label="📍 Départ"
            disabled={isLoading}
          />

          {/* Champ Arrivée avec Autocomplete */}
          <Autocomplete
            value={arriveeInput}
            onChange={setArriveeInput}
            onSelect={handleArriveeSelect}
            placeholder="Ex: Gare SNCF, Nantes"
            label="🎯 Arrivée"
            disabled={isLoading}
          />
        </div>

        {/* Boutons d'action */}
        <div className="search-bar__actions">
          <button
            type="submit"
            className="search-bar__button search-bar__button--search"
            disabled={isLoading || !canSearch}
            aria-label="Calculer l'itinéraire"
          >
            {isLoading ? '⏳ Calcul...' : '🔍 Itinéraire'}
          </button>
          {(departInput || arriveeInput) && (
            <button
              type="button"
              className="search-bar__button search-bar__button--reset"
              onClick={handleReset}
              aria-label="Réinitialiser la recherche"
            >
              ✕ Effacer
            </button>
          )}
        </div>
      </form>

      <div className="search-bar__info">
        ℹ️ Entrez une adresse pour voir les suggestions
      </div>
    </div>
  );
};

export default SearchBar;

