# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à l'application PMR Nantes!

## 📋 Avant de Commencer

1. Lisez le [README.md](./README.md) pour comprendre le projet
2. Consultez le [STYLE_GUIDE.md](./STYLE_GUIDE.md) pour les conventions de code
3. Vérifiez que vous avez Node.js 16+ installé

## 🚀 Configuration Locale

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-org/dapi.git
cd dapi

# Installer les dépendances
npm install
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev

# L'application sera disponible à http://localhost:5173
```

### Build

```bash
# Créer une version de production
npm run build

# Prévisualiser la build
npm run preview
```

### Linting

```bash
# Vérifier les erreurs de linting
npm run lint

# Corriger automatiquement les erreurs
npx eslint . --fix
```

## 📝 Processus de Contribution

### 1. Créez une Branche

```bash
git checkout -b feature/ma-fonctionnalite
```

### 2. Faites vos Changements

- Respectez le [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- Écrivez du code lisible et bien documenté
- Ajoutez des commentaires JSDoc pour les fonctions

### 3. Testez votre Code

```bash
# Compiler sans erreurs
npm run build

# Vérifier le linting
npm run lint
```

### 4. Commitez vos Changements

```bash
git add .
git commit -m "feat: description de la fonctionnalité"
```

Utilisez les préfixes conventionnels:
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `refactor:` - Refactorisation du code
- `docs:` - Changements dans la documentation
- `style:` - Changements de style (CSS)
- `chore:` - Autres changements (dépendances, config)

### 5. Poussez et Créez une Pull Request

```bash
git push origin feature/ma-fonctionnalite
```

Puis créez une Pull Request avec:
- Une description claire des changements
- Une référence aux issues liées
- Des screenshots si applicable

## 🎯 Directives de Contribution

### Code Quality

- ✅ Testez votre code dans les 3 modes: dev, build, preview
- ✅ Vérifiez que la compilation réussit: `npm run build`
- ✅ Respectez les conventions de nommage
- ✅ Documentez les fonctions complexes avec JSDoc
- ✅ Minimisez les dépendances externes

### Performance

- ✅ Utilisez le lazy loading pour les composants lourds
- ✅ Optimisez les images et les ressources
- ✅ Évitez les re-renders inutiles avec React.memo si nécessaire
- ✅ Utilisez debounce/throttle pour les événements fréquents

### Accessibilité

- ✅ Utilisez des labels ARIA pour les boutons
- ✅ Assurez-vous que la navigation au clavier fonctionne
- ✅ Testez le contraste des couleurs
- ✅ Utilisez du HTML sémantique

### Documentation

- ✅ Mettez à jour le README si vous ajoutez des fonctionnalités
- ✅ Documentez les nouvelles APIs ou services
- ✅ Ajoutez des commentaires pour la logique complexe

## 🐛 Signaler un Bug

Utilisez les GitHub Issues avec:
1. Un titre clair et descriptif
2. Une description détaillée du bug
3. Les étapes pour reproduire
4. Le comportement attendu
5. Des screenshots si applicable
6. Votre environnement (OS, navigateur, version Node)

## 💡 Suggestions de Fonctionnalités

Créez une issue avec:
1. Un titre clair
2. Une description de la fonctionnalité
3. Le contexte et l'utilité
4. Des cas d'usage
5. Des mockups ou designs si applicable

## 📚 Documentation Utile

- [React Hooks](https://react.dev/reference/react/hooks)
- [Leaflet API](https://leafletjs.com/reference.html)
- [Axios Documentation](https://axios-http.com/)
- [BEM Methodology](http://getbem.com/)

## 🙏 Merci!

Votre contribution aide à rendre l'accessibilité meilleure pour tous!

---

Questions? Contactez-nous via les GitHub Issues ou discussions.

