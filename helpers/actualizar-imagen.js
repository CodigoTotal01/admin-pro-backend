const Usuario = require('../models/usuarios')
const Hospital = require('../models/hospital')
const Medico = require('../models/medicos')

const fs = require("fs");

const borrarImagen = ( path ) => {
    console.log(path)
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    console.log("el tipo: " , tipo);
    switch( tipo ) {

        case 'medicos':
            const medico = await Medico.findById(id);
            if ( !medico ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if ( !hospital ) {
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
  
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;

            break;
    }


}



module.exports = {
    actualizarImagen
}
