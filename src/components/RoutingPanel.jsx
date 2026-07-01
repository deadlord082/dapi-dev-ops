import React from 'react';
import '../styles/routingPanel.css';

/**
 * Composant pour afficher uniquement la distance et la durée du trajet
 */
const RoutingPanel = ({ route, isLoading, onClose }) => {
  return (
    <div className="routing-panel">
      <div className="routing-panel__header">
        <h2>Itinéraire</h2>
        <button
          className="routing-panel__close-button"
          onClick={onClose}
          aria-label="Fermer le panneau"
        >
          ✕
        </button>
      </div>

      {isLoading && (
        <div className="routing-panel__loading">
          Calcul de l'itinéraire...
        </div>
      )}

      {route && !isLoading && (
        <div className="routing-panel__info">
          <div className="routing-panel__stat">
            <div className="routing-panel__stat-content">
              <span className="routing-panel__stat-label">DISTANCE</span>
              <span className="routing-panel__stat-value">
                {(route.distance / 1000).toFixed(1)} km
              </span>
            </div>
            <span className="routing-panel__stat-icon">📏</span>
          </div>

          <div className="routing-panel__stat">
            <div className="routing-panel__stat-content">
              <span className="routing-panel__stat-label">DURÉE ESTIMÉE</span>
              <span className="routing-panel__stat-value">
                {Math.round(route.duration / 60)} min
              </span>
            </div>
            <span className="routing-panel__stat-icon">⏱️</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutingPanel;

