
const mongoose = require('mongoose')

//Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/nodepop'); 

//Control error event
mongoose.connection.on('error', err => {
    console.log('Error de conexión', err);
});

//Event when connection first time
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

//(Optional) Export model
module.exports = mongoose.connection;