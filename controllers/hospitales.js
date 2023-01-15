const { response } = require("express");
const Hospital = require('../models/hospital')

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital // traer a todos los hospitales, pero tre los id de los usuarios usaremos populate
        .find() // nombre del id, indicar que parametros mostrar
        .populate('usuario', 'nombre')


    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({usuario: uid, ...req.body}); //crear el objeto - modelo
    
    try {

        const hospitalDB = await hospital.save(); // save no sale solo 

        res.json({
            ok: true,
            msg: "post ",
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: true,
            msg: "getHostpitales "
        })
    }

 
}


const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "putHosptal"
    })
}


const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: "deltePuttpitales"
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}