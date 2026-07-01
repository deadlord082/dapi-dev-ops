import { useMapEvents } from 'react-leaflet';

/**
 * Composant pour gérer les clics sur la carte
 */
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        console.log('🗺️ MapClickHandler - Clic détecté:', e.latlng);
        onMapClick({
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      }
    },
  });

  return null;
};

export default MapClickHandler;

