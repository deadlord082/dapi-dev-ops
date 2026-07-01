import React, { useState, useEffect } from 'react';
import { getAutocompleteSuggestions } from '../services/autocompleteService';
import '../styles/autocomplete.css';

/**
 * Composant Autocomplete pour les champs de recherche
 * Affiche une liste de suggestions pendant la saisie
 */
const Autocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder = 'Commencez à taper...',
  label = '',
  disabled = false,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!value || value.length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await getAutocompleteSuggestions(value);
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Erreur autocomplétion:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    onSelect(suggestion);
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && value.length > 0) {
        // Permettre la recherche libre
        onSelect({ address: value, latitude: 0, longitude: 0 });
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (value.length > 0) {
          // Recherche libre si aucune suggestion sélectionnée
          onSelect({ address: value, latitude: 0, longitude: 0 });
          setIsOpen(false);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleBlur = () => {
    // Délai pour permettre le clic sur une suggestion
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="autocomplete">
      {label && (
        <label className="autocomplete__label" htmlFor={`autocomplete-${label}`}>
          {label}
        </label>
      )}

      <div className="autocomplete__input-wrapper">
        <input
          id={`autocomplete-${label}`}
          type="text"
          className="autocomplete__input"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => value.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
          disabled={disabled}
          autoComplete="off"
          aria-label={label || placeholder}
          aria-autocomplete="list"
          aria-controls={`suggestions-${label}`}
          aria-expanded={isOpen}
        />

        {isLoading && (
          <span className="autocomplete__loading">⏳</span>
        )}

        {value && !isLoading && (
          <button
            type="button"
            className="autocomplete__clear"
            onClick={() => {
              onChange('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            aria-label="Effacer"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          id={`suggestions-${label}`}
          className="autocomplete__suggestions"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              className={`autocomplete__suggestion ${
                index === selectedIndex ? 'autocomplete__suggestion--selected' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <span className="autocomplete__suggestion-icon">
                {suggestion.icon}
              </span>
              <div className="autocomplete__suggestion-content">
                <div className="autocomplete__suggestion-label">
                  {suggestion.label}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen && suggestions.length === 0 && value.length >= 2 && !isLoading && (
        <div className="autocomplete__no-results">
          Aucun résultat pour "{value}"
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
