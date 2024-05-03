// controlador.js

const { Valoracion, Contenido } = require('./modelo');

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

exports.top10resumido = (req, res) => {
    Contenido.aggregate([
        {
            $addFields: {
                valoracionMedia: { $avg: "$valoraciones.puntuacion" }
            }
        },
        {
            $project: {
                titulo: 1,
                tipo: 1,
                valoracionMedia: 1
            }
        },
        {
            $sort: { valoracionMedia: -1 }
        },
        {
            $limit: 10
        }
    ])
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
};

//EXAMEN    


exports.altaDocumental = async (req, res) => {
    try {
        const documental = new Contenido({
            tipo: 'documental',
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            generos: req.body.generos,
            duracion: req.body.duracion,
            director: req.body.director,
            expertos: req.body.expertos
        });

        await documental.save();
        res.status(201).send(documental);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.bajaDocumental = async (req, res) => {
    try {
        const documental = await Contenido.findOneAndDelete({ _id: req.params.id, tipo: 'documental' });

        if (!documental) {
            return res.status(404).send();
        }

        res.send(documental);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.obtenerDocumentales = async (req, res) => {
    try {
        const documentales = await Contenido.find({ tipo: 'documental' });
        res.send(documentales);
    } catch (error) {
        res.status(500).send(error);
    }
};



exports.modificarDocumental = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['titulo', 'descripcion', 'generos', 'duracion', 'director', 'expertos'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones inválidas!' });
    }

    try {
        const documental = await Contenido.findOne({ _id: req.params.id, tipo: 'documental' });

        if (!documental) {
            return res.status(404).send();
        }

        updates.forEach((update) => documental[update] = req.body[update]);
        await documental.save();
        res.send(documental);
    } catch (error) {
        res.status(400).send(error);
    }
};