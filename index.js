const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');
const exhbs= require ('express-handlebars');
const methodoverrride= require ('method-override');
const session=require('express-session');
const flash= require ('connect-flash');
const passport = require('passport');


const app=express();
require('./Config/database');
require('./Config/passport');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'Views'));

app.engine('.hbs', exhbs({
    defaultLayout:'main',
    layoutDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname: '.hbs'

}));

app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('Content'));
//RUTAS
app.use(require('./Controllers/index'));
app.use(require('./Controllers/statics'));
app.use(require('./Controllers/products'));
app.use(require('./Controllers/users'));

//ARCHIVOS
app.use(express.static(path.join(__dirname, 'Content')));

//INICIALIZACACIONES
require('./Config/database');

//SERVIDOR
app.listen(app.get('port'), ()=>{
  console.log('Server en el puerto', app.get('port'));
});
