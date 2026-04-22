const express = require('express');
const router = express.Router();
const { perfil, albums, contactos, favoritos } = require('../data/data');

// Página principal
router.get('/', (req, res) => {
  res.render('index', {
    perfil,
    albums,
    favoritos,
    titulo: 'Mi Perfil Personal'
  });
});

// Página de álbum individual
router.get('/album/:id', (req, res) => {
  const album = albums.find(a => a.id === parseInt(req.params.id));
  if (!album) return res.status(404).render('404', { titulo: 'No encontrado' });
  res.render('album', { album, perfil, titulo: album.titulo });
});

// Página de contactos
router.get('/contactos', (req, res) => {
  res.render('contactos', { contactos, perfil, titulo: 'Mis Contactos' });
});

// Página de favoritos
router.get('/favoritos', (req, res) => {
  const { favoritos } = require('../data/data');
  res.render('favoritos', { favoritos, perfil, titulo: 'Mis Favoritos' });
});

module.exports = router;
