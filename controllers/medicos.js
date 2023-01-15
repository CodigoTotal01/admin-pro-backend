const {response} = require("express");

const Medico = require("../models/medicos")

const getMedicos = async (req, res = response) => {

    const medicos = await Medico
        .find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body // medico - hospital
    })

    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medicoDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Comunicarse con el administrados "
        })
    }

}


const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Put Medico"
    })
}


const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: "delete Medico"
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}