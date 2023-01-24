
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { response } = require("express");
const Usuario = require('../models/usuarios')

//next continuar con el siguiente ruta, middleware -> son cualquier controllador csolo con el metodo next

const validarJWT = (req, res = response, next) => {

    console.log("pasa")
    //Leer token ->  req -> header
    const token = req.header('x-token');


    try {
        //intentara hausear esta semilla y hara el match correspondiente
        const { uid } = jwt.verify(token, process.env.JWT_SCRET);
        //pasando la informa cion de este middleware a travez del request, facil :D
        req.uid = uid;

        next();
    } catch (error) {
        console.log("error en el js ")
        return res.status(401).json({
            ok: false,
            errors: "El token no es valido"
        });
    }




}
//contaremos con el uid 
const validarAdminRol = async (req, res = response, next) => {

    const uid = req.uid
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                errors: "usuario no existe "
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                errors: "N otiene privilegios para hacer eso "
            });
        }


        next(); //! si admin lograra pasar 
    } catch (error) {
        console.log("error en el js ")
        return res.status(500).json({
            ok: false,
            errors: "Hable con el administrador (validar Rol)"
        });
    }


}


//contaremos con el uid 
const validarAdmin_ROLE_o_MismoUsuario = async (req, res = response, next) => {

    const uid = req.uid
    const id = req.params.id
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                errors: "usuario no existe "
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE' || uid === id) {
    
            next(); //! si admin lograra pasar 

        }else{
            return res.status(403).json({
                ok: false,
                errors: "N otiene privilegios para hacer eso "
            });
        }


    } catch (error) {
        console.log("error en el js ")
        return res.status(500).json({
            ok: false,
            errors: "Hable con el administrador (validar Rol)"
        });
    }


}

module.exports = { validarJWT, validarAdminRol, validarAdmin_ROLE_o_MismoUsuario }