//IMPORTO LOS MODULOS NECESARIOS
const libros = require('../db/db.libros')

//EXPORTO LOS MODULOS
module.exports.nuevoLibro = async function (libro){

    let modelo = {
        titulo: libro.titulo,
        descripcion: libro.descripcion,
        anioDePublicacion: libro.anioDePublicacion,
        autor: libro.autor
    }

    let nuevoLibro = await new libros(modelo).save()
    return nuevoLibro
}

module.exports.listaLibros = async function (){

    let resultado = await libros.find({}, (err, res)=>{
        return res
    })
    return resultado

}

module.exports.eliminaLibro = async function (idLibro){
    
    let resultado = await libros.findByIdAndDelete({_id: idLibro})
    return ('Libro eliminado correctamente')
}