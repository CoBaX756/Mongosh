const express = require('express');
const router = express.Router();
const controlador = require('./controlador'); 

router.get('/status', (req, res) => {
    res.send('El servidor está en funcionamiento');
});

router.get('/series', controlador.obtenerSeries);

router.get('/peliculas', controlador.obtenerPeliculas);

router.post('/alta', controlador.altaContenido); 

router.delete('/baja/:id', controlador.bajaContenido); 

router.put('/modificar/:id', controlador.modificarContenido);

router.get('/series/:genero', controlador.obtenerSeriesPorGeneros);
router.get('/peliculas/:genero', controlador.obtenerPeliculasPorGeneros);
router.get('/contenido/:genero', controlador.obtenerContenidoPorGeneros);

router.get('/top10', controlador.obtenerTop10);
router.get('/top10resumido', controlador.top10resumido);

//EXAMEN
router.post('/altaDocumental', controlador.altaDocumental);

router.delete('/bajaDocumental/:id', controlador.bajaDocumental); 

router.put('/modificarDocumental/:id', controlador.modificarDocumental); 

router.get('/documentales', controlador.obtenerDocumentales); 

router.get('/documentalesExperto', controlador.obtenerDocumentalesPorExperto);

module.exports = router;
