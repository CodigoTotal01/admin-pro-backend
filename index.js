const express = require('express')
const {dbConnection} = require('./database/config')
require('dotenv').config(); //lellendo las variables de entorno d enuestro proyecto
var cors = require("cors")
//crear el servidor de express
const app = express(); 


//configurar cors 
//modleware, eejcuta siempre la funcion siempre que pase por este punto
app.use(cors());

//Lectura y parseo del body
app.use(express.json())


//base de datos 
dbConnection();

//rutas 
app.get('/', (req, res) => {

    res.status(400).json({
        ok: "true",
        msg: "Hola Mundo"
    })
});



app.use('/api/usuarios', require("./routes/usuarios"))
//ruta - (req - res) controlador
app.use('/api/login', require("./routes/auth"))



//levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en puerto ', 3000)
})