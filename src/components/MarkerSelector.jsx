import React from 'react';
import { MARKER_CONFIG } from '../services/customMarkerService';
import '../styles/markerSelector.css';

/**
 * Composant pour sélectionner un type de marqueur à ajouter sur la carte
 */
const MarkerSelector = ({ onMarkerTypeSelected, isActive = false, onClose }) => {
  const handleTypeSelect = (type) => {
    // Envoyer directement le type sélectionné
    console.log('✅ Type sélectionné dans MarkerSelector:', type);
    onMarkerTypeSelected(type);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`marker-selector ${isActive ? 'marker-selector--active' : ''}`}>
      {/* Bouton de fermeture */}
      <button
        className="marker-selector__close"
        onClick={handleClose}
        aria-label="Fermer"
        title="Fermer"
      >
        ✕
      </button>

      <div className="marker-selector__header">
        <h3>Ajouter un obstacle</h3>
        <p className="marker-selector__subtitle">
          Sélectionnez le type puis cliquez sur la carte
        </p>
      </div>

      <div className="marker-selector__types">
        {Object.entries(MARKER_CONFIG).map(([key, config]) => (
          <button
            key={key}
            className="marker-selector__type"
            onClick={() => handleTypeSelect(key)}
            style={{
              borderColor: config.color,
            }}
          >
            <span className="marker-selector__icon">{config.icon}</span>
            <span className="marker-selector__label">{config.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MarkerSelector;

