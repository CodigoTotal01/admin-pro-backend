/*
* Ruta: /API/auth
* */
const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {login, googleSingIn} = require("../controllers/auth"); // para poder usar nuestras rutas

const router = Router();

router.post('/', [
    check('email', "El email es obligatorio").isEmail(),
    check('password', "El password es obligatorio").not().isEmpty(),
    validarCampos
], login)

router.post('/google', [
    check('token', "El token de google es obligatorio").not().isEmpty(),
    validarCampos
], googleSingIn)

module.exports = router; // exportacion por defecto
