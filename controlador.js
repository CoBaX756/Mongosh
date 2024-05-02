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

exports.obtenerSeriesPorGeneros = async (req, res) => {
    try {
        const series = await Contenido.find({ tipo: 'serie', generos: req.params.genero });
        res.json(series);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener películas por género
exports.obtenerPeliculasPorGeneros = async (req, res) => {
    try {
        const peliculas = await Contenido.find({ tipo: 'pelicula', generos: req.params.genero });
        res.json(peliculas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener contenido por género
exports.obtenerContenidoPorGeneros = async (req, res) => {
    try {
        const contenido = await Contenido.find({ generos: req.params.genero });
        res.json(contenido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el contenido', error: error.message });
    }
};

exports.obtenerTop10 = async (req, res) => {
    try {
        const contenido = await Contenido.find().sort({ puntuacionMedia: -1 }).limit(10);
        res.json(contenido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el contenido', error: error.message });
    }
};
const mongoose = require('mongoose');

const Contenido = mongoose.model('contenido');

exports.obtenerTop10Resumido = async (req, res) => {
    try {
        const peliculas = await Contenido.find({ tipo: 'pelicula' }).sort({ puntuacion: -1 }).limit(10).select('titulo tipo -_id');
        const series = await Contenido.find({ tipo: 'serie' }).sort({ puntuacion: -1 }).limit(10).select('titulo tipo -_id');
        res.json({ peliculas, series });
    } catch (error) {
        console.error(error); // Esto registrará el error en la consola
        res.status(500).send('Hubo un error al obtener el top 10 resumido de películas y series');
    }
}