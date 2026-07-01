/**
 * Configuration globale de l'application PMR
 */

// Coordonnées de référence pour Nantes
export const NANTES_CENTER = {
  latitude: 47.2173,
  longitude: -1.5534,
  zoom: 13,
};

// API Configuration
export const API_CONFIG = {
  // API Nantes Métropole
  NANTES_METROPOLE_API: 'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_emplacements-pmr-nantes-metropole/records',

  // API IGN
  IGN_API_KEY: 'essentiels', // Clé publique pour développement
  IGN_GEOCODE_URL: 'https://wxs.ign.fr/essentiels/geoportal/v1/geocode/json',
  IGN_ROUTING_URL: 'https://wxs.ign.fr/essentiels/geoportal/v1/route',
};

// Configuration de la carte Leaflet
export const MAP_CONFIG = {
  defaultZoom: 13,
  minZoom: 10,
  maxZoom: 19,
  tileLayer: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// Configuration des marqueurs
export const MARKER_CONFIG = {
  pmr: {
    color: '#ff6b6b',
    icon: '♿',
  },
  start: {
    color: '#4ecdc4',
    icon: '📍',
  },
  end: {
    color: '#95e1d3',
    icon: '🎯',
  },
};

// Configuration du routage
export const ROUTING_CONFIG = {
  averageSpeed: 40, // km/h
  profile: 'car',
};

// Constantes UI
export const UI_CONFIG = {
  animationDuration: 300, // ms
  debounceDelay: 300, // ms
  searchLimit: 100,
  maxPMRLocations: 1000,
};

