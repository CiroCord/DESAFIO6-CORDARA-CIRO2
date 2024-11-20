import express from "express";
import mongoose  from "mongoose";
import * as dotenv from 'dotenv';
import productoRoutes from "./routes/producto.js";
import cors from 'cors';
dotenv.config();
 
const app= express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/productoscord', productoRoutes);

app.use(cors({
    origin: '*', 
}));
;
async function main() {
    await mongoose.connect(process.env.DB);
}

main()
.then(()=>{
    app.listen(PORT, () =>{
        console.log(`Servidor abierto en http://localhost:${PORT}/api/productoscord`)
    })
})
.catch(err => console.error(err));