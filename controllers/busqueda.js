const {response} = require("express");
const Usuario = require('../models/usuarios')
const Hospital = require('../models/hospital')
const Medico = require('../models/medicos')
const getTodo = async (req, res = response) => {
    const {busqueda} = req.params;
    const regex = new RegExp(busqueda, 'i'); //insencible

    const [usuarios, medicos, hospitales] = await Promise.all([
        await Usuario.find({nombre: regex}),
        await Medico.find({nombre: regex}),
        await Hospital.find({nombre: regex})
    ])


    res.json({
        ok: true,
        msg: "Funciona el todo, de momento",
        usuarios,
        medicos,
        hospitales

    })
}

const getDocumentoColeccion = async (req, res = response) => {
    const {busqueda, tabla} = req.params;
    const regex = new RegExp(busqueda, 'i'); //insencible

    let data = [];


    switch (tabla){
        case 'medicos':
            data = await Medico.find({nombre: regex}).populate('usuario', 'nombre img').populate('hospital', 'nombre img');;
            break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex}).populate('usuario', 'nombre img');;
            break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios - medicos - hospitales '
            })

    }



    res.json({
        ok: true,
        resultados: data

    })
}
module.exports = {
    getTodo,
    getDocumentoColeccion
}