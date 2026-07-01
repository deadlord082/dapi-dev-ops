import axios from 'axios';

// API Nominatim pour l'autocomplétion
const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';

// Coordonnées de Nantes et sa région
const NANTES_BOUNDS = {
  minLat: 47.15,
  maxLat: 47.30,
  minLon: -1.65,
  maxLon: -1.45,
};

/**
 * Récupère les suggestions d'adresses à proximité de Nantes
 * @param {string} query - Texte de recherche (rue, lieu, etc.)
 * @returns {Promise<Array>} - Liste des suggestions
 */
export const getAutocompleteSuggestions = async (query) => {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const response = await axios.get(NOMINATIM_SEARCH_URL, {
      params: {
        q: query,
        format: 'json',
        limit: 10,
        // Limiter à Nantes et sa région
        viewbox: `${NANTES_BOUNDS.minLon},${NANTES_BOUNDS.maxLat},${NANTES_BOUNDS.maxLon},${NANTES_BOUNDS.minLat}`,
        bounded: 1, // Restreindre aux limites
        countrycodes: 'fr',
        'accept-language': 'fr',
      },
      // Timeout pour éviter les requêtes longues
      timeout: 5000,
    });

    if (response.data && Array.isArray(response.data)) {
      return response.data.map((item) => ({
        id: item.osm_id,
        label: item.display_name,
        address: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        type: item.type,
        icon: getIconForType(item.type),
      }));
    }

    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des suggestions:', error);
    return [];
  }
};

/**
 * Retourne une icône appropriée selon le type d'adresse
 * @param {string} type - Type de lieu (road, house, city, etc.)
 * @returns {string} - Emoji correspondant
 */
const getIconForType = (type) => {
  const iconMap = {
    road: '🛣️',
    house: '🏠',
    residential: '🏘️',
    place: '📍',
    city: '🏙️',
    suburb: '🏘️',
    town: '🏘️',
    village: '🏘️',
    amenity: '🏢',
    shop: '🏪',
    restaurant: '🍽️',
    cafe: '☕',
    parking: '🅿️',
    hospital: '🏥',
    school: '🎓',
    library: '📚',
    museum: '🖼️',
    train_station: '🚂',
    bus_stop: '🚌',
    default: '📍',
  };

  return iconMap[type] || iconMap.default;
};

/**
 * Récupère uniquement les rues de Nantes
 * @param {string} query - Nom de la rue
 * @returns {Promise<Array>} - Liste des rues
 */
export const getStreetSuggestions = async (query) => {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const response = await axios.get(NOMINATIM_SEARCH_URL, {
      params: {
        q: `${query}, Nantes, France`,
        format: 'json',
        limit: 15,
        viewbox: `${NANTES_BOUNDS.minLon},${NANTES_BOUNDS.maxLat},${NANTES_BOUNDS.maxLon},${NANTES_BOUNDS.minLat}`,
        bounded: 1,
        countrycodes: 'fr',
        'accept-language': 'fr',
      },
      timeout: 5000,
    });

    if (response.data && Array.isArray(response.data)) {
      return response.data.map((item) => ({
        id: item.osm_id,
        label: item.display_name,
        address: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        type: item.type,
        icon: getIconForType(item.type),
      }));
    }

    return [];
  } catch (error) {
    console.error('Erreur lors de la récupération des suggestions de rues:', error);
    return [];
  }
};

