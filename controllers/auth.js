const {response} = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuarios")
const {generarJWT} = require("../helpers/jwt");
const login  = async (req, res = response) => {

    const {email, password} = req.body;
        try{
            //verificar email
            const usuarioDB = await Usuario.findOne({email});

            if(!usuarioDB){
                res.status(404).json({
                    ok: true,
                    msg: "El correo o contraseña son incorrectos (EM)"
                })
            }

            //verificar contraseña _ encriptada
            const validPassword = bcrypt.compareSync(password, usuarioDB.password)
            if(!validPassword){
                res.status(404).json({
                    ok: true,
                    msg: "El correo o contraseña son incorrectos (PW)"
                })
            }

            console.log(usuarioDB)
            const token = await generarJWT(usuarioDB._id); // id or _id



            res.status(200).json({
                ok: true,
                token
            })
        }catch (error){
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Hable con el administrador"
            })
        }
}


// LA forma tiene que hacer match con el payload  -> si no el token queda invalidado , semilla o palabra secreta
module.exports = {
    login
}