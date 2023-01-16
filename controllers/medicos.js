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


const actualizarMedico = async (req, res = response) => {

    //recibir id atravez del token autorizado
    const uid = req.uid; //jwt

    const id = req.params.id;

    try{
        const medicoDB = await Medico.findById(id);

        if(!medicoDB){
            return res.json({
                ok: false,
                msg: "No se encontro ningun medico con el id"
            })
        }

       const cambioMedico = {
            ...req.body,
           usuario: uid
       }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico);

        res.json({
            ok: true,
            msg: "Medico Actualizado",
            medicoActualizado
        })

    }catch (error){
        res.json({
            ok: false,
            msg: "Hablar con el administrador no se pudo actualizar al medico"
        })
    }



}


const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try{
        const medicoDB = await Medico.findById(id);

        if(!medicoDB){
            return res.json({
                ok: false,
                msg: "No se encontro ningun medico con el id"
            })
        }



        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico Eliminado",
        })

    }catch (error){
        res.json({
            ok: false,
            msg: "Hablar con el administrador no se pudo eliminar al medico"
        })
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}