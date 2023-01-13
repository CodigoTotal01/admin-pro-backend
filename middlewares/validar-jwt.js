
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {response} = require("express");
//next continuar con el siguiente ruta, middleware -> son cualquier controllador csolo con el metodo next

const validarJWT = (req, res = response, next) =>{


    //Leer token ->  req -> header
    const token = req.header('x-token');


    try{
        //intentara hausear esta semilla y hara el match correspondiente
        const {uid} = jwt.verify(token, process.env.JWT_SCRET);
        //pasando la informa cion de este middleware a travez del request, facil :D
        req.uid = uid;
        next();
    }catch (error){
        return res.status(401).json({
            ok: false,
            errors: "El token no es valido"
        });
    }


}

module.exports = {validarJWT}