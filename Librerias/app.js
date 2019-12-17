/*const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app= express ();

const indexRoutes= require('../Librerias/index');

//CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//VARIABLES GLOBALES

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({
extended:false
}));

app.use('/',indexRoutes);

//INICIAR SERVIDOR
app.listen(app.get('port'), ()=>{

  console.log('Server on port 3000', app.get('port'));
});
*/
