/*
* Ruta: /API/totdo:busqueda
* */

const {Router} = require('express')
const {check} = require('express-validator')
const {validarJWT} = require("../middlewares/validar-jwt");
const {validarCampos} = require("../middlewares/validar-campos");
const {getTodo, getDocumentoColeccion} = require("../controllers/busqueda");


const router = Router();

router.get('/:busqueda', [validarJWT] , getTodo);
router.get('/coleccion/:tabla/:busqueda', [validarJWT] , getDocumentoColeccion);
module.exports = router; //
