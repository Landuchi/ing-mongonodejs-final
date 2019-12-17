const express = require('express');
const router = express.Router();
const verificacion = require('../Librerias/middleware');
router.use(verificacion);

const product = require('../Models/product');

router.post('/api/products/nuevo', verificacion, async(req,res)=>{
  const {origen, codigo, descripcion, fecha} = req.body;

if(origen && codigo && descripcion && fecha) {
    const newProduct=  new product({origen,codigo,descripcion,fecha});
    newProduct.user= req.user.id;
    await newProduct.save();
  res.json({mensaje: 'Error agregado exitosamente', status: true});
  }else{
    res.json({mensaje: 'Verifica los datos', status: false});
  }
});

router.get('/api/products', verificacion, async(req,res)=>{
  const productosdevueltos=  await product.find({user: req.user.id});
  productosdevueltos.forEach(item => {
        item._doc.fecha = item._doc.fecha.toISOString().split('T')[0];
    });
  res.json(productosdevueltos);
});

router.get('/api/products/editar/:id', verificacion, async(req,res)=>{
  const productEdit= await product.findById(req.params.id);
  const date = productEdit.fecha.toISOString().split('T')[0];
  res.json(productEdit);
});

router.put('/api/products/editError/:id', verificacion, async(req,res)=>{
  const {origen,codigo,descripcion,fecha}= req.body;
try{
  await  product.findByIdAndUpdate(req.params.id,{origen,codigo,descripcion,fecha});
  res.json({mensaje: 'Error actualizado exitosamente', status: true});
}catch(e){
      res.json({mensaje: 'Ocurrió un error al actualizar', status: false});
}
});

router.delete('/api/products/eliminar/:id', verificacion, async(req,res)=>{
try{
  await product.findByIdAndDelete(req.params.id);
  res.json({mensaje: 'Error eliminado exitosamente', status: true});
}catch(e){
  res.json({mensaje: 'Ocurrió un error al eliminar', status: true});
}
});

module.exports=router;
