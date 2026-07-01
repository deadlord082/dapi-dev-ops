/**
 * Service pour gérer les marqueurs personnalisés (banc, voiture, poubelle)
 * Ces marqueurs indiquent des passages difficiles ou des points d'intérêt
 */

/**
 * Types de marqueurs disponibles
 */
export const MARKER_TYPES = {
  BARRIER: 'barrier',
  BENCH: 'bench',
  STAIRS: 'stairs',
  TOILET: 'toilet',
  VEHICLE: 'vehicle',
  BUILDING: 'building',
};

/**
 * Configuration des types de marqueurs
 */
export const MARKER_CONFIG = {
  [MARKER_TYPES.BARRIER]: {
    label: 'Barrière de travaux',
    icon: '🚧',
    color: '#ff9800',
    description: 'Travaux / Passage bloqué',
  },
  [MARKER_TYPES.BENCH]: {
    label: 'Banc',
    icon: '🪑',
    color: '#4a90e2',
    description: 'Point de repos / Passage difficile',
  },
  [MARKER_TYPES.STAIRS]: {
    label: 'Escaliers',
    icon: '🪜',
    color: '#9c27b0',
    description: 'Obstacle / Passage difficile',
  },
  [MARKER_TYPES.TOILET]: {
    label: 'Toilettes',
    icon: '🚻',
    color: '#00bcd4',
    description: 'Point d\'intérêt',
  },
  [MARKER_TYPES.VEHICLE]: {
    label: 'Véhicule gênant',
    icon: '🚗',
    color: '#e91e63',
    description: 'Véhicule mal garé / Obstacle',
  },
  [MARKER_TYPES.BUILDING]: {
    label: 'Bâtiment',
    icon: '🏢',
    color: '#607d8b',
    description: 'Point d\'intérêt',
  },
};

/**
 * Crée un marqueur personnalisé
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {string} type - Type de marqueur (bench, car, trash)
 * @param {string} description - Description optionnelle
 * @returns {Object} - Marqueur créé
 */
export const createMarker = (latitude, longitude, type, description = '') => {
  const config = MARKER_CONFIG[type];
  if (!config) {
    throw new Error(`Type de marqueur invalide: ${type}`);
  }

  return {
    id: `${type}_${Date.now()}`, // ID unique basé sur le timestamp
    latitude,
    longitude,
    type,
    label: config.label,
    icon: config.icon,
    color: config.color,
    description: description || config.description,
    createdAt: new Date().toISOString(),
  };
};

/**
 * Sauvegarde les marqueurs dans localStorage
 * @param {Array} markers - Liste des marqueurs
 */
export const saveMarkersToLocalStorage = (markers) => {
  try {
    localStorage.setItem('customMarkers', JSON.stringify(markers));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des marqueurs:', error);
  }
};

/**
 * Récupère les marqueurs depuis localStorage
 * @returns {Array} - Liste des marqueurs sauvegardés
 */
export const getMarkersFromLocalStorage = () => {
  try {
    const markers = localStorage.getItem('customMarkers');
    return markers ? JSON.parse(markers) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des marqueurs:', error);
    return [];
  }
};

/**
 * Supprime un marqueur
 * @param {Array} markers - Liste des marqueurs
 * @param {string} markerId - ID du marqueur à supprimer
 * @returns {Array} - Liste mise à jour
 */
export const deleteMarker = (markers, markerId) => {
  return markers.filter((m) => m.id !== markerId);
};

/**
 * Exporte les marqueurs en JSON
 * @param {Array} markers - Liste des marqueurs
 * @returns {string} - JSON stringifié
 */
export const exportMarkers = (markers) => {
  return JSON.stringify(markers, null, 2);
};

/**
 * Importe les marqueurs depuis JSON
 * @param {string} jsonString - JSON stringifié
 * @returns {Array} - Liste des marqueurs importés
 */
export const importMarkers = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Erreur lors de l\'import des marqueurs:', error);
    return [];
  }
};

