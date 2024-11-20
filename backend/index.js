import express from "express";
import mongoose  from "mongoose";
import * as dotenv from 'dotenv';
import productoRoutes from "./routes/producto.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';  // Agregar esta importación
import { dirname } from 'path';       // Agregar esta importación

dotenv.config();

// Obtener __dirname con import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));  // Ahora funciona con __dirname

app.use('/api/productoscord', productoRoutes);  // Aquí tienes tus rutas de productos

// Cualquier otra ruta que no sea API, servir el archivo index.html
app.get('*', (req, res) => {
    console.log("Sirviendo el archivo index.html"); 
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

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
