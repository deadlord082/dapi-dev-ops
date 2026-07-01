import { useState, useCallback } from 'react';
import { getAllPMRLocations, getPMRByCommune, formatPMRData } from '../services/pmrService';

/**
 * Hook personnalisé pour gérer le chargement des places PMR
 * @returns {Object} État et fonctions de gestion des places PMR
 */
export const usePMRLocations = () => {
  const [pmrLocations, setPMRLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Charge toutes les places PMR
   */
  const loadAll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllPMRLocations();
      const formatted = formatPMRData(data);
      setPMRLocations(formatted);
      return formatted;
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement de toutes les places PMR:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Charge les places PMR par commune
   */
  const loadByCommune = useCallback(async (commune) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPMRByCommune(commune);
      const formatted = formatPMRData(data);
      setPMRLocations(formatted);
      return formatted;
    } catch (err) {
      setError(err.message);
      console.error(`Erreur lors du chargement des places PMR pour ${commune}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Filtre les places PMR par localité (search)
   */
  const filterByLocation = useCallback((searchTerm) => {
    if (!searchTerm) return pmrLocations;

    const term = searchTerm.toLowerCase();
    return pmrLocations.filter(
      (location) =>
        location.commune.toLowerCase().includes(term) ||
        location.adresse.toLowerCase().includes(term)
    );
  }, [pmrLocations]);

  /**
   * Réinitialise les places PMR
   */
  const reset = useCallback(() => {
    setPMRLocations([]);
    setError(null);
  }, []);

  return {
    pmrLocations,
    isLoading,
    error,
    loadAll,
    loadByCommune,
    filterByLocation,
    reset,
  };
};

export default usePMRLocations;

