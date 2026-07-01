import React from 'react';
import '../styles/pmrMarker.css';

/**
 * Composant pour afficher les informations d'une place PMR
 * Utilisé dans les popups de la carte Leaflet
 */
const PMRMarkerPopup = ({ location, onSelect }) => {
  return (
    <div className="pmr-popup">
      <h3 className="pmr-popup__title">{location.commune}</h3>
      <div className="pmr-popup__content">
        <p className="pmr-popup__address">📍 {location.adresse}</p>
        <div className="pmr-popup__details">
          <span className="pmr-popup__detail-item">
            🚗 <strong>{location.nombrePlaces}</strong> place(s)
          </span>
          <span className="pmr-popup__detail-item">
            ⏱️ {location.duree}
          </span>
          <span className="pmr-popup__detail-item">
            📋 {location.type}
          </span>
        </div>
      </div>
      {onSelect && (
        <button
          className="pmr-popup__button"
          onClick={() => onSelect(location)}
        >
          Sélectionner cette place
        </button>
      )}
    </div>
  );
};

export default PMRMarkerPopup;

