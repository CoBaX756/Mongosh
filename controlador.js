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
