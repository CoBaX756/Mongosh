const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    res.send('El servidor está en funcionamiento');
});

router.get('/series', controlador.obtenerSeries);

// Ruta para obtener todas las películas
router.get('/peliculas', controlador.obtenerPeliculas);

module.exports = router;
