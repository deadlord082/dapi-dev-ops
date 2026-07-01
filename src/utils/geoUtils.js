/**
 * Utilitaires pour les calculs géographiques et conversions
 */

/**
 * Convertit les degrés en radians
 * @param {number} degrees - Valeur en degrés
 * @returns {number} - Valeur en radians
 */
export const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

/**
 * Convertit les radians en degrés
 * @param {number} radians - Valeur en radians
 * @returns {number} - Valeur en degrés
 */
export const radiansToDegrees = (radians) => {
  return (radians * 180) / Math.PI;
};

/**
 * Formate une distance en km/m
 * @param {number} distanceKm - Distance en kilomètres
 * @returns {string} - Distance formatée
 */
export const formatDistance = (distanceKm) => {
  if (distanceKm >= 1) {
    return `${distanceKm.toFixed(1)} km`;
  }
  return `${Math.round(distanceKm * 1000)} m`;
};

/**
 * Formate une durée en minutes/heures
 * @param {number} minutes - Durée en minutes
 * @returns {string} - Durée formatée
 */
export const formatDuration = (minutes) => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
  return `${minutes} min`;
};

/**
 * Formate les coordonnées en degrés/minutes/secondes
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {Object} - Coordonnées formatées
 */
export const formatCoordinates = (latitude, longitude) => {
  const formatCoord = (coord) => {
    const degrees = Math.floor(Math.abs(coord));
    const minutesDecimal = (Math.abs(coord) - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = ((minutesDecimal - minutes) * 60).toFixed(2);
    return { degrees, minutes, seconds };
  };

  return {
    latitude: formatCoord(latitude),
    longitude: formatCoord(longitude),
  };
};

/**
 * Obtient la direction cardinale basée sur un azimut
 * @param {number} azimuth - Azimut en degrés (0-360)
 * @returns {string} - Direction cardinale (N, NE, E, SE, S, SW, W, NW)
 */
export const getCardinalDirection = (azimuth) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(azimuth / 22.5) % 16;
  return directions[index];
};

/**
 * Calcule l'azimut (direction) entre deux points
 * @param {number} lat1 - Latitude du point 1
 * @param {number} lon1 - Longitude du point 1
 * @param {number} lat2 - Latitude du point 2
 * @param {number} lon2 - Longitude du point 2
 * @returns {number} - Azimut en degrés (0-360)
 */
export const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const dLon = degreesToRadians(lon2 - lon1);
  const lat1Rad = degreesToRadians(lat1);
  const lat2Rad = degreesToRadians(lat2);

  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  const bearing = radiansToDegrees(Math.atan2(y, x));

  return (bearing + 360) % 360;
};

/**
 * Valide les coordonnées GPS
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {boolean} - True si les coordonnées sont valides
 */
export const isValidCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Calcule les limites (bounds) pour un ensemble de coordonnées
 * @param {Array} coordinates - Tableau de coordonnées [lat, lon]
 * @returns {Object} - Limites {minLat, maxLat, minLon, maxLon}
 */
export const calculateBounds = (coordinates) => {
  if (coordinates.length === 0) {
    return null;
  }

  let minLat = coordinates[0][0];
  let maxLat = coordinates[0][0];
  let minLon = coordinates[0][1];
  let maxLon = coordinates[0][1];

  coordinates.forEach(([lat, lon]) => {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
  });

  return { minLat, maxLat, minLon, maxLon };
};

/**
 * Crée un polygone d'un rayon autour d'un point
 * @param {number} latitude - Latitude du centre
 * @param {number} longitude - Longitude du centre
 * @param {number} radiusKm - Rayon en kilomètres
 * @param {number} sides - Nombre de côtés du polygone
 * @returns {Array} - Tableau de coordonnées formant le polygone
 */
export const createRadiusPolygon = (latitude, longitude, radiusKm, sides = 32) => {
  const R = 6371; // Rayon de la Terre en km
  const polygon = [];

  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 2 * Math.PI;
    const lat =
      Math.asin(
        Math.sin(degreesToRadians(latitude)) * Math.cos(radiusKm / R) +
          Math.cos(degreesToRadians(latitude)) * Math.sin(radiusKm / R) * Math.cos(angle)
      );
    const lon =
      degreesToRadians(longitude) +
      Math.atan2(
        Math.sin(angle) * Math.sin(radiusKm / R) * Math.cos(degreesToRadians(latitude)),
        Math.cos(radiusKm / R) - Math.sin(degreesToRadians(latitude)) * Math.sin(lat)
      );

    polygon.push([radiansToDegrees(lat), radiansToDegrees(lon)]);
  }

  return polygon;
};

