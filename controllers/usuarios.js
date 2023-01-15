const Usuario = require('../models/usuarios')
const {response, json} = require("express"); // usamos nuestro modelo
const bcryptjs = require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");
//atrapar o optener los errores de nuestro express validator recolecto

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });

}

const crearUsuario = async (req, res = response) => {

    const {email, password, nombre} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);


        //encriptar contraseña - generar data aleatoria
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


};

const actualizarUsuario = async (req, res = response) => {
        const uid = req.params.id; // parans util cundo desde ndode definirmos el nombre que que recivirimos como variablen oquiere decir que esto enviara el usuario;

        try {
            const usuarioDB = await Usuario.findById(uid);
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario con ese id'
                });
            }
            //campos enviados desde el cliente, extraer campos
            const {password, google, email, ...campos} = req.body;


            if (usuarioDB.email !== email) {
                console.log("Soy una consulta inecesaria ")
                //cambiar a un correo electronico que existe en mi base de datos
                const existeEmail = await Usuario.findOne({email});

                if (existeEmail) {
                    return res.status(400).json({
                        ok: false, msg: "Ya existe este usuario con este email"
                    })

                }
            }

            campos.email = email;
            //actualizar el usuario en la db, cmoomngoose nos mandara la informacionde ANTES como se veia, peor molesta
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


            res.status(200).json({
                ok: true,
                usuario: usuarioActualizado
            });

        } catch
            (e) {
            console.log(e);
            res.status(500).json({
                ok: false,
                msg: "Error al intentar actualizar al usuario"
            });
        }
    }
;


const borrarUsuario = async (req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);


        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        const usuarioEliminado = await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: "Se elimino el usuario "
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}