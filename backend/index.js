import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 10000;

// Configura CORS antes de las rutas
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen (ajusta según sea necesario)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Agregar un log para ver si CORS está funcionando
app.use((req, res, next) => {
    console.log(`CORS aplicado a la solicitud desde: ${req.headers.origin}`);
    next();
});

// Define la ruta de la API
app.get('/api/productoscord', (req, res) => {
    res.json({ productos: [] });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
