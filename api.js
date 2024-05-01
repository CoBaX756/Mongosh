const express = require('express');
const router = express.Router();
const controlador = require('./controlador'); // Asegúrate de que el nombre del archivo del controlador sea correcto

router.get('/status', (req, res) => {
    res.send('El servidor está en funcionamiento');
});

router.get('/series', controlador.obtenerSeries);

router.get('/peliculas', controlador.obtenerPeliculas);

router.post('/alta', controlador.altaContenido); // Ruta para dar de alta un contenido

router.delete('/baja/:id', controlador.bajaContenido); // Ruta para eliminar contenido

module.exports = router;
