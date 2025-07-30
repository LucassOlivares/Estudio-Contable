const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir todo el contenido estático de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal - envía el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
