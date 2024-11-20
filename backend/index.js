import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import productoRoutes from './routes/producto.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Usamos CORS
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen (cambia esto si es necesario)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Directorio 'frontend' si lo tienes

app.use('/api/productoscord', productoRoutes);  // Rutas de la API

// Servir el archivo index.html para cualquier otra ruta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

async function main() {
    await mongoose.connect(process.env.DB);
}

main()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor abierto en http://localhost:${PORT}/api/productoscord`);
    });
})
.catch(err => console.error(err));
