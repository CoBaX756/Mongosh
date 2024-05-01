// modelo.js

const mongoose = require('mongoose');

// Esquema para las valoraciones de los contenidos
const valoracionSchema = new mongoose.Schema({
    nick: String,
    puntuacion: Number,
    comentario: String
});

// Esquema para los capítulos de las series
const capituloSchema = new mongoose.Schema({
    titulo: String,
    duracion: Number, // Duración del episodio en minutos
    descripcion: String
});

// Esquema para las temporadas de las series
const temporadaSchema = new mongoose.Schema({
    numero: Number, // Número de la temporada
    capitulos: [capituloSchema] // Array de capítulos
});

// Esquema para los contenidos (películas y series)
const contenidoSchema = new mongoose.Schema({
    titulo: String,
    tipo: { type: String, enum: ['pelicula', 'serie'] },
    descripcion: String,
    valoraciones: [valoracionSchema], // Array de valoraciones
    generos: [String],
    numeroReproducciones: Number,
    premios: [String],
    duracion: Number, // Duración de la película en minutos
    director: String,
    temporadas: [temporadaSchema] // Array de temporadas (solo para series)
});

// Crear los modelos a partir de los esquemas
const Valoracion = mongoose.model('Valoracion', valoracionSchema);
const Contenido = mongoose.model('Contenido', contenidoSchema);
const Capitulo = mongoose.model('Capitulo', capituloSchema);
const Temporada = mongoose.model('Temporada', temporadaSchema);

// Exportar los modelos para su uso en otros archivos
module.exports = { Valoracion, Contenido, Capitulo, Temporada };
