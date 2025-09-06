const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📂 Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

const upload = multer({ storage });

// ✅ Crear un nuevo producto (con imagen)
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, precio, categoria } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const nuevo = new Producto({ nombre, precio, categoria, imagen });
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📦 Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// 🗑️ Eliminar producto y su imagen asociada
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 🧹 Eliminar imagen del servidor si existe
    if (producto.imagen) {
      const rutaImg = path.join(__dirname, '..', 'uploads', producto.imagen);
      if (fs.existsSync(rutaImg)) {
        fs.unlinkSync(rutaImg);
      }
    }

    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: '🗑️ Producto e imagen eliminados correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
