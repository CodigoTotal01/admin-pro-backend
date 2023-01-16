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


//? Actualizar el hospital - nombre

const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;

    const uid = req.uid; // jwt

    try{
    const hospitalDB = await Hospital.findById(id);

    //si no hay hospital con el id proporcionado

        if(!hospitalDB){

            return res.status(400).json({
                ok: false,
                msg: "El id del hospital no es valido"
            })
        }

       const cambiosHospital = {
            ...req.body,
           usuario: uid
       }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true}); //enviamso una copia del objeto  y que retorne el documento actualizado

    res.json({
        ok: true,
        msg: "Actualizar Hospital",
        hospitalActualizado
    })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "putHosptal"
        })
    }
}


const borrarHospital = async (req, res = response) => {

    const id = req.params.id;


    try{
        const hospitalDB = await Hospital.findById(id);

        //si no hay hospital con el id proporcionado

        if(!hospitalDB){

            return res.status(400).json({
                ok: false,
                msg: "El id del hospital no es valido"
            })
        }

        await Hospital.findByIdAndDelete(id); //eliminar al traves de l id

        res.json({
            ok: true,
            msg: "Hospital Eliminado"
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hablar con el administrador"
        })
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}