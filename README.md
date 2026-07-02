# 🚗 PMR Nantes - Application de Cartographie pour Personnes à Mobilité Réduite

Une application web moderne pour localiser les places de stationnement PMR (Personnes à Mobilité Réduite) à Nantes et sa métropole. Construite avec React et Vite, elle fournit un accès facile aux données d'accessibilité grâce aux APIs d'IGN et de Nantes Métropole.

## 🎯 Fonctionnalités

- **🗺️ Carte Interactive** : Visualisation en temps réel des places PMR sur une carte Leaflet
- **🔍 Recherche d'Adresses** : Trouvez facilement votre destination
- **📍 Calcul d'Itinéraires** : Obtenez la distance et la durée estimée
- **♿ Localisation PMR** : Identifiez toutes les places accessibles à proximité
- **📊 Informations Détaillées** : Nombre de places, durée de stationnement, type de place
- **📱 Responsive Design** : Fonctionne sur tous les appareils (desktop, tablette, mobile)

## 🏗️ Architecture

```
src/
├── components/          # Composants React
│   ├── Map.jsx         # Composant principal de la carte
│   ├── SearchBar.jsx   # Barre de recherche
│   ├── RoutingPanel.jsx # Panneau de routage
│   └── PMRMarkerPopup.jsx # Popup pour les marqueurs PMR
├── services/           # Services API
│   ├── pmrService.js   # Service pour les places PMR
│   └── routingService.js # Service de routage et géocodage
├── hooks/              # Custom React hooks
│   └── usePMRLocations.js # Hook pour gérer les localisations
├── constants/          # Constantes de l'application
│   └── labels.js       # Labels et textes
├── config/             # Configuration
│   └── appConfig.js    # Configuration globale
├── styles/             # Fichiers CSS
│   ├── map.css
│   ├── searchBar.css
│   ├── routingPanel.css
│   └── pmrMarker.css
├── App.jsx            # Composant principal
├── main.jsx           # Point d'entrée
└── index.css          # Styles globaux
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v16+)
- npm ou yarn

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```
L'application sera disponible à `http://localhost:5173`

### Build Production
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## � Docker

### Prérequis
- Docker Desktop ou Docker Engine installé et démarré
- Sur Windows, Docker Desktop doit être en mode Linux Container
- Copier `.env.example` en `.env` et adapter les variables

### Lancer la stack en local
```bash
docker compose up --build
```

### Profils
- `dev` : démarre aussi Adminer pour accéder à la base de données depuis `http://localhost:8081`
- `prod` : démarre uniquement les services nécessaires

Exemple pour le mode dev :
```bash
docker compose --profile dev up --build
```

### Vérifier le daemon Docker
Si la commande retourne une erreur de type :
> unable to get image 'dapi-backend': failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine

Alors le daemon Docker n'est pas actif ou Docker Desktop n'est pas lancé.

Sur Windows, vérifiez :
```bash
docker version
```

et ouvrez Docker Desktop, puis relancez :
```bash
docker compose up --build
```

### Points d’attention
- Ne pas exposer la base de données publiquement
- La configuration utilise un réseau interne `internal_db` pour le service `db`
- Le frontend appelle le backend via `/api`

## �📚 Technologies Utilisées

- **React 19** : Framework UI moderne
- **Vite** : Bundler ultra-rapide
- **Leaflet** : Bibliothèque de cartographie
- **React-Leaflet** : Intégration React/Leaflet
- **Axios** : Client HTTP pour les requêtes API
- **CSS3** : Styles modernes et animations

## 🔌 APIs Intégrées

### Nantes Métropole
- **Dataset PMR** : https://data.nantesmetropole.fr/explore/dataset/244400404_emplacements-pmr-nantes-metropole/

### IGN (Institut Géographique National)
- **Géocodage** : Conversion adresses ↔ coordonnées
- **Routage** : Calcul d'itinéraires optimisés

## 📋 Structuration et Bonnes Pratiques React/JavaScript

### Structure des Composants
- **Composants fonctionnels** : Utilisation exclusive de fonctions avec hooks
- **Séparation des responsabilités** : Un composant = une responsabilité
- **Props destructurées** : Meilleure lisibilité
- **JSDoc** : Documentation des fonctions

### Gestion d'État
- **useState** : État local des composants
- **useEffect** : Effets secondaires et chargement de données
- **Custom Hooks** : Logique réutilisable

### Services
- **Séparation API** : Services dédiés pour chaque source de données
- **Gestion d'erreurs** : Try/catch et retours d'erreur clairs
- **Formatage des données** : Normalisation des réponses API

### Styles
- **CSS Modules** : Importation CSS avec scope
- **Variables CSS** : Thème cohérent
- **Animations** : Transitions fluides
- **Responsive** : Breakpoints pour mobiles

## 🎨 Schéma de Couleurs

- **Bleu** (#4a90e2) : Couleur principale
- **Rouge** (#ff6b6b) : Places PMR
- **Turquoise** (#4ecdc4) : Point de départ
- **Vert clair** (#95e1d3) : Point d'arrivée

## 🔄 Flux de l'Application

1. L'utilisateur ouvre l'application
2. Les places PMR se chargent depuis l'API Nantes Métropole
3. L'utilisateur recherche une adresse (départ)
4. L'utilisateur recherche une destination
5. Un itinéraire est calculé
6. Les places PMR à proximité sont affichées
7. L'utilisateur peut sélectionner une place PMR ou ajuster l'itinéraire

## 📱 Points de Rupture Responsive

- **Desktop** : Full layout avec panneau latéral
- **Tablette** (< 768px) : Layout adapté
- **Mobile** (< 480px) : Layout empilé

## 🐛 Dépannage

### La carte n'apparaît pas
- Vérifier que Leaflet est correctement importé
- Vérifier la hauteur du conteneur

### Les places PMR ne s'affichent pas
- Vérifier la connexion à l'API Nantes Métropole
- Vérifier la console pour les erreurs réseau

### Erreurs CORS
- Les APIs utilisées autorisent les requêtes cross-origin
- Sinon, utiliser un proxy CORS

## � CI/CD

Le dépôt inclut maintenant un workflow GitHub Actions qui exécute les étapes suivantes sur chaque push vers la branche main :

1. Lint
2. Tests unitaires
3. Build et publication de l'image Docker sur GHCR
4. Analyse de vulnérabilités avec Trivy
5. Déploiement sur un VPS via SSH

### Secrets GitHub à configurer

- SSH_HOST : adresse IP ou nom de domaine du VPS
- SSH_USER : utilisateur SSH du VPS
- SSH_PRIVATE_KEY : clé privée SSH permettant le déploiement
- GHCR_TOKEN : token avec droits de lecture sur GHCR ou un token GitHub classique si l'usage est compatible

### Déploiement VPS

Le workflow déploie sur le VPS en utilisant la commande Docker Compose. Le serveur doit donc disposer de Docker et Docker Compose installés, ainsi que d'un dossier de déploiement prêt à recevoir la configuration de production.

## �📝 Licence

MIT
