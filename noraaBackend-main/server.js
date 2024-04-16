const express = require('express');
const { Client } = require('pg');

const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "noraaDBV2"
});
client.connect();

app.get('/restaurantes', async (req, res) => {
    try {
        const consulta = 'SELECT * FROM "public"."restaurante"';
        const resultado = await client.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/restaurantes-cercanos', async (req, res) => {
    try {
        const { latitud, longitud } = req.query;

        if (!latitud || !longitud) {
            return res.status(400).json({ error: 'Los parámetros de latitud y longitud son requeridos' });
        }

        const consulta = "SELECT * FROM restaurante WHERE ABS(ABS(restaurante.coordenada_latitud) - ABS("+longitud+"))  <= 0.008 AND ABS(ABS(restaurante.coordenada_longitud) - ABS("+latitud+")) <= 0.008;";

        const resultado = await client.query(consulta);

        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes cercanos:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes cercanos' });
    }
});

app.get('/restaurantes-cercanos-limitados', async (req, res) => {
    try {
        const { latitud, longitud, limite } = req.query;

        if (!latitud || !longitud || !limite)  {
            return res.status(400).json({ error: 'Los parámetros de limite, latitud y longitud son requeridos' });
        }

        const consulta = "SELECT * FROM restaurante WHERE ABS(ABS(restaurante.coordenada_latitud) - ABS("+longitud+"))  <= 0.008 AND ABS(ABS(restaurante.coordenada_longitud) - ABS("+latitud+")) <= 0.008 LIMIT "+limite+"; ";

        const resultado = await client.query(consulta);

        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes cercanos:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes cercanos' });
    }
});

app.use(express.json());

app.post('/restaurantes-registrar', async (req, res) => {
    try {
        const { nombre_restaurante, direccion, telefono, horario_atencion, coordenada_longitud, coordenada_latitud, valoracion, icono_base } = req.body;
        if (!nombre_restaurante || !direccion || !telefono || !horario_atencion || !coordenada_longitud || !coordenada_latitud || !valoracion || !icono_base) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const consulta = `INSERT INTO restaurante (nombre_restaurante, direccion, telefono, horario_atencion, coordenada_longitud, coordenada_latitud, valoracion, imagen, icono_base) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        
        const resultado = await client.query(consulta, [nombre_restaurante, direccion, telefono, horario_atencion, coordenada_longitud, coordenada_latitud, valoracion, 'imagen_generica', icono_base]);

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al agregar un nuevo restaurante:', error);
        res.status(500).json({ error: 'Error al agregar un nuevo restaurante' });
    }
});



app.listen(PORT, () => {
    console.log(`Servidor backend iniciado en el puerto ${PORT}`);
  });
