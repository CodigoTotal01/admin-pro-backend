
const {validationResult} = require('express-validator')
const {response} = require("express");
//next continuar con el siguiente ruta, middleware
const validarCampos = (req, res = response, next) =>{

    const errores = validationResult(req); // se generara un arregl ode eeeores con los que se paso en la ruta

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {validarCampos}