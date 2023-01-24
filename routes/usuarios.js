/*
* Ruta: /API/usuarios
*
*
* */

const {Router} = require('express')
const {check} = require('express-validator')
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT, validarAdminRol, validarAdmin_ROLE_o_MismoUsuario} = require("../middlewares/validar-jwt"); // para poder usar nuestras rutas

const router = Router();



router.get('',  [validarJWT, validarAdminRol],  getUsuarios);
//la informacio nse envvia en el body como json, los segundos argumentos son midelware -> verificar que la informacion venga como queremos
router.post('',
[
    //ponemos los campos que deben de venir
    check('nombre', "El nombre es Obligatorio").not().isEmpty(),
    check('password', "El password es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    validarCampos
]
    ,crearUsuario);

router.put("/:id", [
    [validarJWT, validarAdmin_ROLE_o_MismoUsuario], 
    //ponemos los campos que deben de venir
    check('nombre', "El nombre es Obligatorio").not().isEmpty(),
    check('role', "El role es Obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    validarCampos
], actualizarUsuario)

router.delete( '/:id',
[validarJWT, validarAdminRol], 
    borrarUsuario
);

module.exports = router; // exportacion por defecto
