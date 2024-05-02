// controlador.js

const { Contenido } = require('./modelo');

// Controlador para obtener todas las series
exports.obtenerSeries = async (req, res) => {
    try {
        const series = await Contenido.find({ tipo: 'serie' });
        res.json(series);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las series', error: error.message });
    }
};

// Controlador para obtener todas las películas
exports.obtenerPeliculas = async (req, res) => {
    try {
        const peliculas = await Contenido.find({ tipo: 'pelicula' });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las películas', error: error.message });
    }
};

exports.altaContenido = async (req, res) => {
    try {
        const nuevoContenido = new Contenido(req.body);
        const resultado = await nuevoContenido.save();
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al dar de alta el contenido', error: error.message });
    }
};

exports.bajaContenido = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Contenido.findByIdAndDelete(id);
        if (!resultado) {
            return res.status(404).json({ mensaje: 'El contenido no fue encontrado' });
        }
        res.status(200).json({ mensaje: 'Contenido eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el contenido', error: error.message });
    }
};

exports.modificarContenido = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Contenido.findByIdAndUpdate(id, req.body, { new: true });
        if (!resultado) {
            return res.status(404).json({ mensaje: 'El contenido no fue encontrado' });
        }
        res.status(200).json({ mensaje: 'Contenido modificado correctamente', contenido: resultado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al modificar el contenido', error: error.message });
    }
};

// Asegúrate de que tu modelo de Mongoose tenga un campo 'genero'
const Serie = require('./modelo').Serie;
const Pelicula = require('./modelo').Pelicula;

exports.obtenerSeriesPorGenero = async (req, res) => {
    try {
        const series = await Serie.find({ genero: req.params.genero });
        res.json(series);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.obtenerPeliculasPorGenero = async (req, res) => {
    try {
        const peliculas = await Pelicula.find({ genero: req.params.genero });
        res.json(peliculas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener contenido por género
exports.obtenerContenidoPorGenero = async (req, res) => {
    try {
        const contenido = await Contenido.find({ genero: req.params.genero });
        res.json(contenido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el contenido', error: error.message });
    }
};