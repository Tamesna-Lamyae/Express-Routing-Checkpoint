const express = require('express');
const app = express();
const path = require('path');

// Middleware personnalisé pour vérifier l'heure
const checkWorkingHours = (req, res, next) => {
  const currentTime = new Date();
  const day = currentTime.getDay(); // 0: Dimanche, 1: Lundi, ..., 6: Samedi
  const hour = currentTime.getHours(); // Heure actuelle (0-23)

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // L'heure est correcte, continuez la requête
  } else {
    res.send('L\'application est uniquement disponible pendant les heures de travail (du lundi au vendredi, de 9h à 17h).');
  }
};

// Appliquer le middleware à toutes les routes
app.use(checkWorkingHours);

// Configuration du moteur de template (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
