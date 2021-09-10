//Importamos los modulos necesarios
const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const libros = require('./services/libros.services')


//Middlewares globales
app.use(express.json())

//Inicio de nuestro servidor
async function iniciarServidor() {
    mongoose.connect(process.env.DB_HOST + process.env.DB_DATABASE,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(r => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor Iniciado en el puerto " + process.env.PORT)
        })
    }).catch(error => {
        console.log(error)
        console.log("No pude conectar a la base de datos")
    })
}

iniciarServidor();

//MANEJO DE ERRORES GENERALES
app.use((err, req, res, next) => {
    if (err) {
        console.log(err)
        if (!res.headersSent) {
            res.status(500).send("Error en el servidor: " + err.message)
        }
    }
    next();
})

//Endopints

app.get('/libros', async (req, res)=> {
    try {
        let resultado = await libros.listaLibros()
        //console.log(resultado)
        res.json(resultado)
    }catch (error) {
        res.status(500).send('Algo raro paso')
    }
});

app.post('/libros', async (req,res)=>{
    let libro = req.body
    try {
        let resultado = await libros.nuevoLibro(libro)
        console.log(resultado)
        res.json('se agrego correctamente el libro')
    }catch (error) {
        res.status(500).send('Algo raro paso')
    }

});

app.delete('/libros/:id', async (req,res)=> {
    let id = req.params.id
    try {
        let resultado = await libros.eliminaLibro(id)
        //console.log(resultado)
        res.json('se elimino correctamente el libro')
    }catch (error) {
        res.status(500).send('Algo raro paso')
    }
});
