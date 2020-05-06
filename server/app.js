// Enviroment variables
require('dotenv').config()

// Database connection
require('./configs/mongoose.config')

const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const path         = require('path');


const app = express();

// // Configs
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)

// // Base URLS
const index = require('./routes/index');
app.use('/', index);
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/movements', require('./routes/movements.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/typesPayment', require('./routes/typesPayment.routes'))
app.use('/api/files', require('./routes/files.routes'))


// QUITAR DESPUES DE TERMINAR PRUEBAS
app.use('/api/test', require('./routes/test.routes'))



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


app.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

module.exports = app;


