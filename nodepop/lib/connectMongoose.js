
const mongoose = require('mongoose')

//Control error event
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
});

//Event when connection first time
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

//Connect to database
mongoose.connect(process.env.MONGODB_URL); 

//(Optional) Export model
module.exports = mongoose.connection;