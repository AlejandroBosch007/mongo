const {Schema, model} = require('mongoose');

const librosSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: String,
    anioDePublicacion: String,
    autor: String
}, {
    timestamps: true
})

module.exports = model('libros', librosSchema)