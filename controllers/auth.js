const {response} = require("express");
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuarios")
const {generarJWT} = require("../helpers/jwt");
const {googleVerify} = require("../helpers/google-verify");
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


const googleSingIn  = async (req, res = response) =>{

    try {
        const {email, name, picture} = await googleVerify(req.body.token);


        const usuariosDB = await  Usuario.findOne(({email}));

        let usuario;

        if(!usuariosDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuariosDB;
            usuario.google = true;
        }

        await usuario.save(); // se guarda el usuario sea nuevo o ya existente


        //Generar JWT
        const token = await generarJWT(usuario.id); // id or _id

        res.json({
            ok: true,
            email, name, picture,
            token

        })
    }catch (e) {
        res.status(400).json({
            ok: false,
            msg: "Token de google no es correcto"
        })
    }
}

// Funcion actilization token of token user - New Token New - for programers
const renewToken   = async (req, res = response) => {
    //darle una nueva vida al token
    const uid = req.uid; // del req -> middleware -> validarToken

    //Generar JWT
    const token = await generarJWT(uid); // id or _id

    res.json({
        ok: true,
        token
    })
}



// LA forma tiene que hacer match con el payload  -> si no el token queda invalidado , semilla o palabra secreta
module.exports = {
    login,
    googleSingIn,
    renewToken
}