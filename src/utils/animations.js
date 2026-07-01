/**
 * Utilitaires pour les animations et transitions
 */

/**
 * Fonction de debounce pour optimiser les appels de fonction fréquents
 * @param {Function} func - Fonction à exécuter
 * @param {number} wait - Délai en millisecondes
 * @returns {Function} - Fonction debounced
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Fonction de throttle pour limiter la fréquence d'appel
 * @param {Function} func - Fonction à exécuter
 * @param {number} limit - Délai minimum entre les appels en millisecondes
 * @returns {Function} - Fonction throttled
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Animation fluide du zoom de la carte
 * @param {number} currentZoom - Zoom actuel
 * @param {number} targetZoom - Zoom cible
 * @param {number} duration - Durée de l'animation en ms
 * @returns {Promise} - Promise qui se résout après l'animation
 */
export const animateZoom = (_currentZoom, targetZoom, duration = 300) => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(targetZoom);
    }, duration);
  });
};

/**
 * Fonction d'easing pour les animations
 * @param {number} t - Progression de 0 à 1
 * @returns {number} - Valeur eased
 */
export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Crée une animation fluide entre deux valeurs
 * @param {number} start - Valeur de départ
 * @param {number} end - Valeur de fin
 * @param {number} duration - Durée en ms
 * @param {Function} callback - Callback appelé à chaque frame
 * @returns {Function} - Fonction pour annuler l'animation
 */
export const animateValue = (start, end, duration, callback) => {
  let animationId;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    const currentValue = start + (end - start) * easeProgress;

    callback(currentValue);

    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animationId = requestAnimationFrame(animate);

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};

/**
 * Détecte si l'utilisateur préfère les animations réduites
 * @returns {boolean} - True si les animations réduites sont préférées
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Crée une animation fluide avec respect des préférences d'accessibilité
 * @param {number} start - Valeur de départ
 * @param {number} end - Valeur de fin
 * @param {number} duration - Durée en ms
 * @param {Function} callback - Callback appelé à chaque frame
 * @returns {Function} - Fonction pour annuler l'animation
 */
export const accessibleAnimate = (start, end, duration, callback) => {
  if (prefersReducedMotion()) {
    callback(end);
    return () => {};
  }

  return animateValue(start, end, duration, callback);
};
