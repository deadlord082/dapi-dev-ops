import React from 'react';
import '../styles/elementTypePanel.css';

const ELEMENT_TYPES = [
    { id: 'barrier', label: 'Barrière de travaux', icon: '🚧' },
    { id: 'bench', label: 'Banc', icon: '🪑' },
    { id: 'stairs', label: 'Escaliers', icon: '🪜' },
    { id: 'toilet', label: 'Toilettes', icon: '🚻' },
    { id: 'vehicle', label: 'Véhicule gênant', icon: '🚗' },
    { id: 'building', label: 'Bâtiment', icon: '🏢' },
];

const ElementTypePanel = ({ onSelectType, onClose }) => {
    return (
        <div className="element-type-panel">
            <div className="element-type-panel__header">
                <h3 className="element-type-panel__title">Un signalement ?</h3>
                <button
                    className="element-type-panel__close"
                    onClick={onClose}
                    aria-label="Fermer"
                >
                    ✕
                </button>
            </div>
            <div className="element-type-panel__grid">
                {ELEMENT_TYPES.map((type) => (
                    <button
                        key={type.id}
                        className="element-type-panel__button"
                        onClick={() => onSelectType(type.id)}
                        aria-label={type.label}
                    >
                        <span className="element-type-panel__icon">{type.icon}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ElementTypePanel;
