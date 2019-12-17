const express = require('express');
const router = express.Router();

router.get('/users/ingresar',(req,res)=>{
  res.render('users/ingresar');
});
router.get('/',(req,res)=>{
  res.render('layouts/main');
});
router.get('/products/nuevo',(req,res)=>{
  res.render('products/nuevo');
});
router.get('/products',(req,res)=>{
  res.render('products/mostrar');
});
router.get('/products/editar',(req,res)=>{
  res.render('products/editar');
});
router.get('/users/registro',(req,res)=>{
  res.render('users/registro');
});

module.exports=router;
