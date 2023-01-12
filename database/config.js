const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config(); //lellendo las variables de entorno d enuestro proyecto

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.DB_CNN, {
            //options usecreateindex, usefindandmodify are not supported
            useNewUrlParser: true, 
            useUnifiedTopology: true,
       
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}


//exportar funcion en node 
module.exports = {
    dbConnection
}