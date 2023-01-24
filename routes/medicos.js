/*
* Ruta: /API/hospitales
* */

const {Router} = require('express')
const {check} = require('express-validator')
const {crearMedico, actualizarMedico, borrarMedico, getMedicos, getMedicoById} = require("../controllers/medicos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {validarCampos} = require("../middlewares/validar-campos");


const router = Router();

router.get('', [] , getMedicos);
//la informacio nse envvia en el body como json, los segundos argumentos son midelware -> verificar que la informacion venga como queremos
router.post('',
    [
     validarJWT,
        check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
        check("hospital", "El id del hospital  es obligatorio").isMongoId(),
        validarCampos
        ]
    ,crearMedico);

router.put("/:id", [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
    validarCampos
], actualizarMedico)

router.delete("/:id",
    validarJWT,
    borrarMedico
);


router.get("/:id",
    validarJWT,
    getMedicoById
);


module.exports = router; // exportacion por defecto
