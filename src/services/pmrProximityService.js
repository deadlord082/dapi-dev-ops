import { calculateDistance } from './routingService';

/**
 * Trouve les places PMR à proximité d'une zone (rayon donné)
 * @param {Array} pmrLocations - Liste des places PMR
 * @param {Object} location - Centre de la recherche {latitude, longitude}
 * @param {number} radiusKm - Rayon de recherche en km (par défaut 1 km)
 * @returns {Array} - Places PMR triées par proximité
 */
export const findNearbyPMR = (pmrLocations, location, radiusKm = 1) => {
  if (!pmrLocations || pmrLocations.length === 0) {
    return [];
  }

  if (!location || location.latitude === undefined || location.longitude === undefined) {
    return [];
  }

  // Calculer la distance de chaque place PMR au centre
  const pmrWithDistance = pmrLocations
    .map((pmr) => ({
      ...pmr,
      distance: calculateDistance(
        location.latitude,
        location.longitude,
        pmr.latitude,
        pmr.longitude
      ),
    }))
    .filter((pmr) => pmr.distance <= radiusKm) // Filtrer par rayon
    .sort((a, b) => a.distance - b.distance); // Trier par distance croissante

  return pmrWithDistance;
};

/**
 * Trouve les places PMR proches d'un itinéraire
 * @param {Array} pmrLocations - Liste des places PMR
 * @param {Array} routeGeometry - Géométrie du trajet (array de [lat, lon])
 * @param {number} radiusKm - Rayon de recherche en km (par défaut 0.5 km)
 * @returns {Array} - Places PMR proches du trajet
 */
export const findPMRAlongRoute = (pmrLocations, routeGeometry, radiusKm = 0.5) => {
  if (!pmrLocations || pmrLocations.length === 0 || !routeGeometry) {
    return [];
  }

  const pmrAlongRoute = pmrLocations
    .map((pmr) => {
      // Trouver la distance minimale de cette PMR à tous les points du trajet
      let minDistance = Infinity;

      routeGeometry.forEach(([routeLat, routeLon]) => {
        const dist = calculateDistance(
          pmr.latitude,
          pmr.longitude,
          routeLat,
          routeLon
        );
        minDistance = Math.min(minDistance, dist);
      });

      return {
        ...pmr,
        distance: minDistance,
      };
    })
    .filter((pmr) => pmr.distance <= radiusKm) // Filtrer par rayon
    .sort((a, b) => a.distance - b.distance); // Trier par distance

  return pmrAlongRoute;
};

/**
 * Compte les places PMR dans un rayon donné
 * @param {Array} pmrLocations - Liste des places PMR
 * @param {Object} location - Centre de la recherche
 * @param {number} radiusKm - Rayon en km
 * @returns {number} - Nombre de places PMR
 */
export const countNearbyPMR = (pmrLocations, location, radiusKm = 1) => {
  return findNearbyPMR(pmrLocations, location, radiusKm).length;
};

/**
 * Obtient les statistiques des places PMR proches
 * @param {Array} pmrLocations - Liste des places PMR
 * @param {Object} location - Centre de la recherche
 * @param {number} radiusKm - Rayon en km
 * @returns {Object} - Statistiques (count, nearestDistance, averageDistance)
 */
export const getPMRStatistics = (pmrLocations, location, radiusKm = 1) => {
  const nearby = findNearbyPMR(pmrLocations, location, radiusKm);

  if (nearby.length === 0) {
    return {
      count: 0,
      nearestDistance: null,
      averageDistance: null,
    };
  }

  const distances = nearby.map((pmr) => pmr.distance);
  const averageDistance = distances.reduce((a, b) => a + b, 0) / distances.length;

  return {
    count: nearby.length,
    nearestDistance: distances[0],
    averageDistance: parseFloat(averageDistance.toFixed(2)),
  };
};

