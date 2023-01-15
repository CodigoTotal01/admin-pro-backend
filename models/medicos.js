const {Schema, model} = require('mongoose');

//crear schema

const MedicosSchema = Schema({
        nombre: {
            type: String,
            required: true
        },
        img: {
            type: String,
        },
        usuario: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        hospital: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    }
);

MedicosSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
});

//exportar el modelo en base al schema, moongose le pone la s al final
module.exports = model("Medico", MedicosSchema);
