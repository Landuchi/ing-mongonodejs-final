

const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    origen: {type: String, required: true},
    codigo: {type: Number, required: true},
    descripcion: { type: String, required:true },
    fecha:{type: Date, default:Date.now},
    user: {type:String}
});



module.exports = mongoose.model('product', productSchema);
