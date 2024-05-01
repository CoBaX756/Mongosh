const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
//const cors = require('cors');

let app = express();


/** 
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://playalmi.duckdns.org:8080', 'http://18.215.6.232:8080', 'http://playalmi.duckdns.org']
}));
*/

app.use(bodyParser.urlencoded({
    extended: true
}));
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

async function insertarDatosEjemplo() {
    try {

// Películas de ejemplo
const peliculas = [
    {
        titulo: 'El Padrino',
        tipo: 'pelicula',
        descripcion: 'Un clásico del cine dirigido por Francis Ford Coppola.',
        generos: ['Drama', 'Crimen'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Película', 'Premio Globo de Oro a la Mejor Película'],
        duracion: 175,
        director: 'Francis Ford Coppola'
    },
    {
        titulo: 'Forrest Gump',
        tipo: 'pelicula',
        descripcion: 'La vida de un hombre con discapacidad intelectual que llega a ser parte de importantes eventos históricos.',
        generos: ['Drama', 'Comedia'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Película', 'Premio Globo de Oro a la Mejor Película'],
        duracion: 142,
        director: 'Robert Zemeckis'
    },
    {
        titulo: 'Pulp Fiction',
        tipo: 'pelicula',
        descripcion: 'Una película de Quentin Tarantino que entrelaza varias historias de criminales.',
        generos: ['Drama', 'Crimen'],
        numeroReproducciones: 0,
        premios: ['Palma de Oro en el Festival de Cannes', 'Premio Óscar al Mejor Guion Original'],
        duracion: 154,
        director: 'Quentin Tarantino'
    },
    {
        titulo: 'El Señor de los Anillos: La Comunidad del Anillo',
        tipo: 'pelicula',
        descripcion: 'Primera entrega de la trilogía épica basada en la obra de J.R.R. Tolkien.',
        generos: ['Fantasía', 'Aventura'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Fotografía', 'Premio BAFTA a los Mejores Efectos Visuales'],
        duracion: 178,
        director: 'Peter Jackson'
    },
    {
        titulo: 'Matrix',
        tipo: 'pelicula',
        descripcion: 'Una película de ciencia ficción y acción que ha dejado una huella en la cultura popular.',
        generos: ['Ciencia ficción', 'Acción'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a los Mejores Efectos Visuales', 'Premio BAFTA a los Mejores Efectos Visuales'],
        duracion: 136,
        director: 'Lana y Lilly Wachowski'
    },
    {
        titulo: 'Titanic',
        tipo: 'pelicula',
        descripcion: 'Una historia de amor épica ambientada en el desafortunado viaje inaugural del RMS Titanic.',
        generos: ['Romance', 'Drama'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Película', 'Premio Globo de Oro a la Mejor Película'],
        duracion: 195,
        director: 'James Cameron'
    },
    {
        titulo: 'El Rey León',
        tipo: 'pelicula',
        descripcion: 'Una película animada de Disney que sigue la historia del joven león Simba.',
        generos: ['Animación', 'Aventura'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Banda Sonora Original', 'Premio Globo de Oro a la Mejor Banda Sonora'],
        duracion: 88,
        director: 'Roger Allers, Rob Minkoff'
    },
    {
        titulo: 'Interestelar',
        tipo: 'pelicula',
        descripcion: 'Un viaje épico a través del espacio y el tiempo en busca de un nuevo hogar para la humanidad.',
        generos: ['Ciencia ficción', 'Drama'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a los Mejores Efectos Visuales', 'Premio BAFTA al Mejor Diseño de Producción'],
        duracion: 169,
        director: 'Christopher Nolan'
    },
    {
        titulo: 'El Laberinto del Fauno',
        tipo: 'pelicula',
        descripcion: 'Una película de fantasía oscura ambientada en la posguerra española.',
        generos: ['Fantasía', 'Drama'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Fotografía', 'Premio BAFTA a la Mejor Película en Lengua no Inglesa'],
        duracion: 118,
        director: 'Guillermo del Toro'
    },
    {
        titulo: 'La Lista de Schindler',
        tipo: 'pelicula',
        descripcion: 'Basada en la historia real de Oskar Schindler, un empresario que salvó a más de mil judíos durante el Holocausto.',
        generos: ['Drama', 'Historia'],
        numeroReproducciones: 0,
        premios: ['Premio Óscar a la Mejor Película', 'Premio Globo de Oro a la Mejor Película'],
        duracion: 195,
        director: 'Steven Spielberg'
    }
];
// Series de ejemplo
const series = [
    {
        titulo: 'Breaking Bad',
        tipo: 'serie',
        descripcion: 'Un profesor de química con cáncer se convierte en un fabricante de metanfetamina para asegurar el futuro de su familia.',
        generos: ['Drama', 'Crimen'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Pilot', duracion: 58, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'Game of Thrones',
        tipo: 'serie',
        descripcion: 'Intrigas políticas, traiciones y batallas por el Trono de Hierro en los Siete Reinos de Westeros.',
        generos: ['Drama', 'Fantasía'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Winter Is Coming', duracion: 62, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'Stranger Things',
        tipo: 'serie',
        descripcion: 'En los años 80, un grupo de niños se enfrenta a fenómenos sobrenaturales en su pequeña ciudad.',
        generos: ['Drama', 'Ciencia ficción'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Chapter One: The Vanishing of Will Byers', duracion: 48, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'Friends',
        tipo: 'serie',
        descripcion: 'La vida, el amor y las risas de seis amigos que viven en Nueva York.',
        generos: ['Comedia', 'Romance'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'The One Where Monica Gets a Roommate', duracion: 22, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'The Crown',
        tipo: 'serie',
        descripcion: 'Los dramáticos eventos que rodean el reinado de la Reina Isabel II.',
        generos: ['Drama', 'Historia'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Wolferton Splash', duracion: 60, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'The Mandalorian',
        tipo: 'serie',
        descripcion: 'Un pistolero solitario en los confines de la galaxia se embarca en una misión para devolver a un misterioso niño a su hogar.',
        generos: ['Ciencia ficción', 'Western'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Chapter 1: The Mandalorian', duracion: 39, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'Stranger Things',
        tipo: 'serie',
        descripcion: 'En los años 80, un grupo de niños se enfrenta a fenómenos sobrenaturales en su pequeña ciudad.',
        generos: ['Drama', 'Ciencia ficción'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Chapter One: The Vanishing of Will Byers', duracion: 48, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'The Crown',
        tipo: 'serie',
        descripcion: 'Los dramáticos eventos que rodean el reinado de la Reina Isabel II.',
        generos: ['Drama', 'Historia'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Wolferton Splash', duracion: 60, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'Breaking Bad',
        tipo: 'serie',
        descripcion: 'Un profesor de química con cáncer se convierte en un fabricante de metanfetamina para asegurar el futuro de su familia.',
        generos: ['Drama', 'Crimen'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Pilot', duracion: 58, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    },
    {
        titulo: 'The Office',
        tipo: 'serie',
        descripcion: 'Un falso documental que sigue el día a día de los empleados de una oficina.',
        generos: ['Comedia'],
        numeroReproducciones: 0,
        temporadas: [
            {
                numero: 1,
                capitulos: [
                    { titulo: 'Pilot', duracion: 22, descripcion: 'Descripción del episodio 1' },
                    // Agrega más capítulos de la temporada 1 aquí
                ]
            },
            // Agrega más temporadas aquí
        ]
    }
];

        console.log('Películas y series insertadas correctamente en la base de datos');
    } catch (error) {
        console.error('Error al insertar películas y series en la base de datos:', error);
    }
}

// Llamar a la función para insertar películas y series al iniciar la aplicación
insertarDatosEjemplo();