const {Schema, model} = require('mongoose');

//crear schema

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String, // opcional
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }


});

//fleha apunta al padre cuidado renemos que apuntar al this de a ufncion
//fines viaules no afecta
UsuarioSchema.method('toJSON', function (){
    const {_id, __v, password, ...object} = this.toObject();
    object.uid = _id;
    return object
});

//exportar el modelo en base al schema, moongose le pone la s al final
module.exports = model("Usuario", UsuarioSchema);
