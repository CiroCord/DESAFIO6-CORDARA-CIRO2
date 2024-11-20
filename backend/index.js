import express from "express";
import mongoose  from "mongoose";
import * as dotenv from 'dotenv';
import productoRoutes from "./routes/producto.js";
import cors from 'cors';
dotenv.config();
 
const app= express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));  // Cambia la ruta si es necesario

app.use('/api/productoscord', productoRoutes);  // Aquí tienes tus rutas de productos

// Cualquier otra ruta que no sea API, servir el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
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