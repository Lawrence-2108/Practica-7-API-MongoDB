require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const app = express();
app.use(express.json());

// MongoDB genera identificadores hexadecimales de 24 caracteres.
app.param('id', (req, res, next, id) => {
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ mensaje: 'Id no valido' });
    }
    next();
});

// POST y PUT requieren los tres campos y comparten la misma validación.
function validarProducto(req, res, next) {
    const { nombre, descripcion, precio } = req.body ?? {};
    if (typeof nombre !== 'string' || !nombre.trim() ||
        typeof descripcion !== 'string' || !descripcion.trim() ||
        !Number.isFinite(precio) || precio < 0) {
        return res.status(400).json({
            mensaje: 'Nombre y descripcion son obligatorios. Precio debe ser un numero no negativo.'
        });
    }
    req.datosProducto = { nombre, descripcion, precio };
    next();
}

function responderError(res, error) {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ mensaje: 'Datos del producto no validos' });
    }
    console.error('Error al consultar MongoDB:', error.message);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
}

app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        return res.json(productos);
    } catch (error) {
        return responderError(res, error);
    }
});

app.get('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        return res.json(producto);
    } catch (error) {
        return responderError(res, error);
    }
});

app.post('/productos', validarProducto, async (req, res) => {
    try {
        const producto = await Producto.create(req.datosProducto);
        return res.status(201).json(producto);
    } catch (error) {
        return responderError(res, error);
    }
});

app.put('/productos/:id', validarProducto, async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.datosProducto, {
            new: true,
            runValidators: true
        });
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        return res.json(producto);
    } catch (error) {
        return responderError(res, error);
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        return res.json({ mensaje: 'Producto eliminado', producto });
    } catch (error) {
        return responderError(res, error);
    }
});

// El servidor empieza a recibir solicitudes cuando MongoDB está conectado.
async function iniciar() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');
        const puerto = process.env.PORT || 3000;
        app.listen(puerto, () => console.log(`API disponible en http://localhost:${puerto}`));
    } catch (error) {
        console.error('No se pudo conectar a MongoDB:', error.name);
        process.exitCode = 1;
    }
}

iniciar();
