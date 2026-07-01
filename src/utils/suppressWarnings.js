/**
 * Fichier de configuration pour supprimer les avertissements de dépendances obsolètes
 * (comme MouseEvent.mozPressure dans Leaflet)
 *
 * Ces avertissements viennent de Leaflet et n'impactent pas le fonctionnement de l'app.
 * Ils sont causés par des APIs obsolètes mais toujours supportées par les navigateurs.
 */

// Supprimer les avertissements spécifiques à Leaflet
const originalWarn = console.warn;

console.warn = function(...args) {
  const message = args[0]?.toString?.() || '';

  // Ignorer les avertissements de Leaflet sur les APIs obsolètes
  if (
    message.includes('mozPressure') ||
    message.includes('mozInputSource') ||
    message.includes('MouseEvent') ||
    message.includes('deprecated')
  ) {
    return;
  }

  // Afficher les autres avertissements normalement
  originalWarn.apply(console, args);
};

export default null;

