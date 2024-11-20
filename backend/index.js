import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import productoRoutes from "./routes/producto.js";
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Conexión a la base de datos
async function main() {
    await mongoose.connect(process.env.DB);
}

main()
    .then(() => {
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));

// Configuración de CORS
app.use(cors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

// Parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/productoscord', productoRoutes); // Rutas para productos

// Servir los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Ruta para servir el archivo HTML
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
