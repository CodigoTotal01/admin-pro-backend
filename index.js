const express = require('express')
const {dbConnection} = require('./database/config')
require('dotenv').config(); //lellendo las variables de entorno d enuestro proyecto
var cors = require("cors")
//crear el servidor de express
const app = express(); 


//configurar cors 
//modleware, eejcuta siempre la funcion siempre que pase por este punto
app.use(cors());


//base de datos 
dbConnection();

//rutas 
app.get('/', (req, res) => {

    res.status(400).json({
        ok: "true",
        msg: "Hola Mundo"
    })
});

//levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en puerto ', 3000)
})