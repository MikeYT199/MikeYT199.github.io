const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const mainRouter = require('./routes/main');
const apiRouter = require('./routes/api');

app.use('/', mainRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`\n Servidor corriendo en http://localhost:${PORT}\n`);
});
