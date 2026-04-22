const express = require('express');
const router = express.Router();
const data = require('../data/data');

// ─── CONTACTOS (AJAX) ────────────────────────────────────────────────────────

// Obtener todos los contactos
router.get('/contactos', (req, res) => {
  const { buscar, tipo } = req.query;
  let resultado = [...data.contactos];

  if (buscar) {
    const q = buscar.toLowerCase();
    resultado = resultado.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  }
  if (tipo && tipo !== 'todos') {
    resultado = resultado.filter(c => c.tipo === tipo);
  }

  res.json({ success: true, contactos: resultado, total: resultado.length });
});

// Agregar contacto
router.post('/contactos', (req, res) => {
  const { nombre, email, telefono, tipo } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ success: false, mensaje: 'Nombre y email son requeridos' });
  }
  const nuevo = {
    id: Date.now(),
    nombre,
    email,
    telefono: telefono || 'No especificado',
    tipo: tipo || 'Otro',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nombre}&backgroundColor=b6e3f4`
  };
  data.contactos.push(nuevo);
  res.json({ success: true, contacto: nuevo, mensaje: 'Contacto agregado exitosamente' });
});

// Eliminar contacto
router.delete('/contactos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = data.contactos.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ success: false, mensaje: 'Contacto no encontrado' });
  data.contactos.splice(idx, 1);
  res.json({ success: true, mensaje: 'Contacto eliminado' });
});

// ─── LIKES (AJAX) ────────────────────────────────────────────────────────────

// Like a álbum
router.post('/like/album/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { accion } = req.body; // 'like' o 'unlike'
  if (!data.likesStore.albums[id]) data.likesStore.albums[id] = 0;
  data.likesStore.albums[id] += accion === 'unlike' ? -1 : 1;
  if (data.likesStore.albums[id] < 0) data.likesStore.albums[id] = 0;
  res.json({ success: true, likes: data.likesStore.albums[id] });
});

// Like a foto
router.post('/like/foto/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { accion } = req.body;
  if (!data.likesStore.fotos[id]) data.likesStore.fotos[id] = 0;
  data.likesStore.fotos[id] += accion === 'unlike' ? -1 : 1;
  if (data.likesStore.fotos[id] < 0) data.likesStore.fotos[id] = 0;
  res.json({ success: true, likes: data.likesStore.fotos[id] });
});

// ─── FAVORITOS (AJAX) ────────────────────────────────────────────────────────

// Obtener favoritos
router.get('/favoritos', (req, res) => {
  res.json({ success: true, favoritos: data.favoritos });
});

// Agregar a favoritos
router.post('/favoritos', (req, res) => {
  const { itemId, tipo, titulo, url, album } = req.body;
  const existe = data.favoritos.find(f => f.itemId === itemId && f.tipo === tipo);
  if (existe) {
    return res.json({ success: false, mensaje: 'Ya está en favoritos', enFavoritos: true });
  }
  const nuevo = { id: Date.now(), tipo, itemId, titulo, url, album };
  data.favoritos.push(nuevo);
  res.json({ success: true, favorito: nuevo, mensaje: 'Agregado a favoritos', enFavoritos: true });
});

// Quitar de favoritos
router.delete('/favoritos/:itemId/:tipo', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const tipo = req.params.tipo;
  const idx = data.favoritos.findIndex(f => f.itemId === itemId && f.tipo === tipo);
  if (idx === -1) return res.status(404).json({ success: false, mensaje: 'No encontrado en favoritos' });
  data.favoritos.splice(idx, 1);
  res.json({ success: true, mensaje: 'Eliminado de favoritos', enFavoritos: false });
});

// Verificar si está en favoritos
router.get('/favoritos/check/:itemId/:tipo', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const tipo = req.params.tipo;
  const enFavoritos = data.favoritos.some(f => f.itemId === itemId && f.tipo === tipo);
  res.json({ success: true, enFavoritos });
});

module.exports = router;
