import mongoose from "mongoose";
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre: String,
    precio: {type: mongoose.Types.Decimal128},
    descripcion: String
})

export const Producto = mongoose.model('Producto', ProductoSchema);
