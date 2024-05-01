// index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const { Contenido, Valoracion, Temporada, Capitulo } = require('./modelo');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/Netalmix', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
if (!db) {
    console.log("ERROR connecting db");
} else {
    console.log("DB connected successfully");
}

var port = process.env.port || 8080;

app.get('/info', (req, res) => res.send('El mejor WS de la historia'));

app.listen(port, function () {
    console.log("Running on port: " + port);
});

app.use('/', apiRoutes);

// Insertar datos de ejemplo
async function insertarDatosEjemplo() {
    try {
        // Crear valoraciones de ejemplo
        const valoracion1 = new Valoracion({ nick: 'usuario1', puntuacion: 4, comentario: 'Buena película' });
        const valoracion2 = new Valoracion({ nick: 'usuario2', puntuacion: 5, comentario: 'Excelente' });

        // Guardar valoraciones en la base de datos
        await valoracion1.save();
        await valoracion2.save();

        // Crear temporadas y capítulos de ejemplo
        const capitulo1 = new Capitulo({ titulo: 'Capítulo 1', duracion: 45, descripcion: 'Descripción del capítulo 1' });
        const capitulo2 = new Capitulo({ titulo: 'Capítulo 2', duracion: 40, descripcion: 'Descripción del capítulo 2' });
        const temporada1 = new Temporada({ numero: 1, capitulos: [capitulo1, capitulo2] });

        // Guardar temporada en la base de datos
        await temporada1.save();

        // Crear contenido (película) de ejemplo
        const nuevaPelicula = new Contenido({
            titulo: 'Nombre de la película',
            tipo: 'pelicula',
            descripcion: 'Descripción de la película',
            valoraciones: [valoracion1, valoracion2],
            generos: ['Aventuras', 'Fantasía'],
            numeroReproducciones: 0,
            premios: ['Oscar a la mejor película'],
            duracion: 120,
            director: 'Nombre del director'
        });

        // Guardar película en la base de datos
        await nuevaPelicula.save();

        console.log('Datos de ejemplo insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de ejemplo:', error);
    }
}

// Llamar a la función para insertar datos de ejemplo al iniciar la aplicación
insertarDatosEjemplo();
