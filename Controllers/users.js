const express =  require('express');
const router = express.Router();
const passport = require('passport');
const usuarios = require('../Models/user');
const configs = require('../Config/configs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser').json();
const verificacion = require('../Librerias/middleware');
router.use(verificacion);

//INICIO DE SESION

router.get('/api/users/perfil', verificacion, async (req,res)=>{
  const userdevuelto=  await usuarios.findById({_id: req.user.id});
  console.log(req.user.id);
  res.json(userdevuelto);
});

router.post('/api/users/login',bodyParser,async (req, res) => {
let {correo,password} = req.body;
correo = correo.replace(/\s+/g, "");
console.log(req.body);
const user = await usuarios.findOne({correo: correo});
if (!user) {
  res.json({ mensaje: "Usuario o contraseña incorrectos"})
} else {
  const match = await user.matchPassword(password);
  if(match) {

    const payload = {
     check:  true,
    id: user.id
    };
    const token = jwt.sign(payload, configs.llave);
    res.json({
     mensaje: 'Autenticación correcta',
     token: token
    });

  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }
}
});


router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('error', 'Has cerrado sesión');
  res.redirect('/users/ingresar');
});


router.post('/api/users/registro',async (req,res)=>{
  const {nombreuser,correo,password,confirmpassword} = req.body;
  let error=[];
if(password != confirmpassword){
    res.json({mensaje: 'Las contraseñas no coinciden', status: false});
}else{
  if(nombreuser && correo) {
      const correoUser = await usuarios.findOne({correo: correo});
      if(correoUser){
      res.json({mensaje: 'El correo ya existe', status: false});
      }else {
      const newUsuario=  new usuarios({nombreuser,correo,password});
      newUsuario.password = await newUsuario.encryptPassword(password);
    try{
      await newUsuario.save();
      res.json({mensaje: 'Usuario agregado exitosamente', status: true});
    }
      catch(e){
      res.json({mensaje: 'Error en agregar usuario', status: false});
     }
     }
    }
}
});



module.exports=router;
