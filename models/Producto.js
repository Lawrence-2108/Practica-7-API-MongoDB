const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 }
}, { collection: 'productos' });

module.exports = mongoose.model('Producto', productoSchema);
