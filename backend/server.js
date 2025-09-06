// server.js - Backend de Capi Biker 🏍️🔥
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 📁 Carpeta de imágenes
const carpetaUploads = path.join(__dirname, 'uploads');
if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads);
}
app.use('/uploads', express.static(carpetaUploads)); // Acceso público a imágenes

// 📦 Conexión MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/capibiker')
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// 🔗 Rutas de producto
const productoRoutes = require('./routes/productoRoutes');
app.use('/productos', productoRoutes); // http://localhost:3001/productos

// 🟢 Servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
