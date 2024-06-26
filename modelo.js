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

const expertoSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    cargo: String
});

// Esquema para los contenidos (películas, series y documentales)
const contenidoSchema = new mongoose.Schema({
    titulo: String,
    tipo: { type: String, enum: ['pelicula', 'serie', 'documental'] },
    descripcion: String,
    valoraciones: [valoracionSchema], // Array de valoraciones
    generos: [String],
    numeroReproducciones: Number,
    premios: [String],
    duracion: Number, // Duración de la película/documental en minutos
    director: String, // Director de la película/documental
    expertos: [expertoSchema], // Array de expertos (solo para documentales)
    temporadas: [temporadaSchema] // Array de temporadas (solo para series)
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
contenidoSchema.virtual('valoracionMedia').get(function() {
    if (this.valoraciones && this.valoraciones.length > 0) {
        const suma = this.valoraciones.reduce((total, valoracion) => total + valoracion.puntuacion, 0);
        return suma / this.valoraciones.length;
    } else {
        return 0;
    }
});
// Crear los modelos a partir de los esquemas
const Valoracion = mongoose.model('Valoracion', valoracionSchema);
const Contenido = mongoose.model('Contenido', contenidoSchema);
const Capitulo = mongoose.model('Capitulo', capituloSchema);
const Temporada = mongoose.model('Temporada', temporadaSchema);
const Experto = mongoose.model('Experto', expertoSchema);

// Exportar los modelos para su uso en otros archivos
module.exports = { Valoracion, Contenido, Capitulo, Temporada };
