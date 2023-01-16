/*
* Ruta: /API/hospitales
* */

const {Router} = require('express')
const {check} = require('express-validator')

const {getHospitales, crearHospital, actualizarHospital, borrarHospital} = require("../controllers/hospitales");
const {validarJWT} = require("../middlewares/validar-jwt");
const {validarCampos} = require("../middlewares/validar-campos"); // para poder usar nuestras rutas

const router = Router();

router.get('', [] , getHospitales);
//la informacio nse envvia en el body como json, los segundos argumentos son midelware -> verificar que la informacion venga como queremos
router.post('',
    [

        validarJWT,
        check('nombre', "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos
    ]
    ,crearHospital);

router.put("/:id", [
    validarJWT,
    check('nombre', "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos
], actualizarHospital)

router.delete( "/:id",  validarJWT,
borrarHospital
);

module.exports = router; // exportacion por defecto
