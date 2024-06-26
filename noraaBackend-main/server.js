const express = require('express');
const { Pool  } = require('pg');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const connectionString = process.env.CONNECTION_STRING || "postgres://ubjh05nsm7foch:p0797c3dcee4ff8cad5d61099a8daf05b4aa40593bb597306f04f44c3cf0027e2@ce1r1ldap2qd4b.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d42c9or8u69837";
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
        release();
    }
});

app.get('/platillos-filtrar', async (req, res) => {
    try {
        const { filtro } = req.query;
        if (!filtro) {
            return res.status(400).json({ error: 'El filtro es requerido' });
        }
        const consulta = 'SELECT * FROM "public"."consumible" WHERE nombre_consumible LIKE %'+filtro+'%;';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/menus-por-restaurante', async (req, res) => {
    try {
        const { id_restaurante} = req.query;
        if (!id_restaurante) {
            return res.status(400).json({ error: 'El filtro es requerido' });
        }
        const consulta = 'SELECT * FROM "public"."menu" WHERE id_restaurante_fk = '+id_restaurante+';';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener los menus', error);
        res.status(500).json({ error: 'Error al obtener menus' });
    }
});

app.get('/platillos-del-menu', async (req, res) => {
    try {
        const { id_menu} = req.query;
        if (!id_menu) {
            return res.status(400).json({ error: 'El id del menu es requerido' });
        }
        const consulta = 'SELECT * FROM "public"."consumible" WHERE id_menu_fk = '+id_menu+';';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error en los platillos del menu:', error);
        res.status(500).json({ error: 'Error al obtener platillos' });
    }
});

app.get('/platillos-del-menu', async (req, res) => {
    try {
        const { id_menu} = req.query;
        if (!id_menu) {
            return res.status(400).json({ error: 'El filtro es requerido' });
        }
        const consulta = 'SELECT * FROM "public"."consumible" WHERE id_menu_fk = '+id_menu+';';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error los platillos del menu:', error);
        res.status(500).json({ error: 'Error al obtener platillos' });
    }
});

app.get('/avistamientos', async (req, res) => {
    try {
        const consulta = 'SELECT * FROM "public"."registro_avistamiento"';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/etiquetas', async (req, res) => {
    try {
        const consulta = 'SELECT * FROM "public"."etiqueta"';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
        res.status(500).json({ error: 'Error al obtener etiquetas' });
    }
});

app.get('/loggeo-usuario', async (req, res) => {
    try {
        const { correo, password } = req.query;
        if (!correo || !password) {
            return res.status(400).json({ error: 'Los parámetros de inicio de sesion son requeridos' });
        }
        const consulta = `SELECT * FROM "public"."usuario" WHERE correo_electronico = '`+correo+`' AND contrasena = '`+password+`'`;
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
        res.status(500).json({ error: 'Error al obtener etiquetas' });
    }
});

app.get('/restaurantes', async (req, res) => {
    try {
        const consulta = 'SELECT * FROM "public"."restaurante"';
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/restaurantes-filtrar', async (req, res) => {
    try {
        const { filtro } = req.query;
        if (!filtro) {
            return res.status(400).json({ error: 'Los parámetros de filtrado son requeridos' });
        }
        const consulta = `SELECT id_restaurante FROM "public"."restaurante" WHERE `+filtro+`;`;
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/restaurantes-correo', async (req, res) => {
    try {
        const { correo } = req.query;
        if (!correo) {
            return res.status(400).json({ error: 'Los parámetros de filtrado son requeridos' });
        }
        const consulta = `SELECT * FROM "public"."restaurante" WHERE correo_electronico = '`+correo+`';`;
        const resultado = await pool.query(consulta);
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/restaurante-por-id', async (req, res) => {
    
    try {
        const { id_buscado } = req.query;
        if (!id_buscado) {
            return res.status(400).json({ error: 'El id es requerido' });
        }
        const consulta = 'SELECT * FROM restaurante WHERE id_restaurante = '+id_buscado+';';
        const resultado = await pool.query(consulta);
        console.log(resultado.rowCount+'  jgkkjg');
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes' });
    }
});

app.get('/restaurantes-por-etiqueta', async (req, res) => {
    try {
        const { etiqueta } = req.query;
        if (!etiqueta) {
            return res.status(400).json({ error: 'Los parámetros de latitud y longitud son requeridos' });
        }
        const consulta = `SELECT * FROM "public"."restaurante" res INNER JOIN "public"."etiqueta_restaurante" er ON res.id_restaurante = er.id_restaurante_etiquetado INNER JOIN "public"."etiqueta" et ON er.id_etiqueta_restaurante = et.id_etiqueta WHERE et.etiqueta_nombre = '`+etiqueta+`';`;
        const resultado = await pool.query(consulta);
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

        const resultado = await pool.query(consulta);

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

        const resultado = await pool.query(consulta);

        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener restaurantes cercanos:', error);
        res.status(500).json({ error: 'Error al obtener restaurantes cercanos' });
    }
});

app.use(express.json({ limit: '10mb' }));
app.post('/restaurantes-registrar', async (req, res) => {
    try {
        const { nombre_restaurante, email, direccion, telefono, horario_atencion, coordenada_longitud, coordenada_latitud, valoracion, icono_base, imagen, etiquetas } = req.body;
        if (!nombre_restaurante || !email || !direccion || !telefono || !horario_atencion || !coordenada_longitud || !coordenada_latitud || !icono_base || !imagen) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Convertir la imagen base64 a formato de bytes
        const byteArray = Buffer.from(imagen.split(',')[1], 'base64');
        console.log('IMAGEN CONVERTIDA');
        // Consulta para insertar el restaurante
        const consultaRestaurante = `INSERT INTO restaurante (nombre_restaurante, direccion, telefono, horario_atencion, coordenada_longitud, coordenada_latitud, valoracion, imagen, icono_base, correo_electronico) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;

        // Insertar el restaurante y obtener su ID
        const resultadoRestaurante = await pool.query(consultaRestaurante, [nombre_restaurante, direccion, telefono, horario_atencion, coordenada_longitud, coordenada_latitud, valoracion, byteArray, icono_base, email]);
        console.log('RESTAURANTE REGISTRADO');
        const idRestaurante = resultadoRestaurante.rows[0].id_restaurante;

        // Consulta para insertar las etiquetas del restaurante en la tabla intermedia
        const consultaEtiquetas = `INSERT INTO etiqueta_restaurante (id_restaurante_etiquetado, id_etiqueta_restaurante) VALUES ($1, $2)`;

        // Insertar las etiquetas del restaurante
        for (const idEtiqueta of etiquetas) {
            await pool.query(consultaEtiquetas, [idRestaurante, idEtiqueta]);
        }

        res.json({ message: 'Restaurante registrado correctamente' });
    } catch (error) {
        console.error('Error al agregar un nuevo restaurante:', error);
        res.status(500).json({ error: 'Error al agregar un nuevo restaurante' });
    }
});


app.post('/avistamientos-registrar', async (req, res) => {
    try {
        const { nombre_restaurante, foto, direccion, id_usuario_fk, coordenada_longitud, coordenada_latitud, icono } = req.body;
        if (!nombre_restaurante || !foto || !direccion || !id_usuario_fk || !coordenada_longitud || !coordenada_latitud || !icono) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const consulta = `INSERT INTO registro_avistamiento (nombre_restaurante, foto, direccion, id_usuario_fk, coordenada_longitud, coordenada_latitud, icono) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        // Convertir la foto base64 a formato de bytes
        const byteArray = Buffer.from(foto.split(',')[1], 'base64');

        const resultado = await pool.query(consulta, [nombre_restaurante, byteArray, direccion, id_usuario_fk, coordenada_longitud, coordenada_latitud, icono]);

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al agregar un nuevo avistamiento:', error);
        res.status(500).json({ error: 'Error al agregar un nuevo avistamiento' });
    }
});

app.post('/usuario-registrar', async (req, res) => {
    try {
        const { nombre, apellido, telefono, correo, password} = req.body;
        if (!nombre || !apellido || !telefono || !correo || !password) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const consulta = `INSERT INTO usuario (nombre, apellido, telefono, correo_electronico, contrasena) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

        const resultado = await pool.query(consulta, [nombre, apellido, telefono, correo, password]);

        res.json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al agregar un nuevo usuario:', error);
        res.status(500).json({ error: 'Error al agregar un nuevo usuario' });
    }
});

app.use(express.json({ limit: '10mb' }));
app.post('/consumible-registrar', async (req, res) => {
    try {
        const { nombre, precio, descripcion, menu_fk, imagen, valoracion} = req.body;
        if (!nombre || !precio || !descripcion || !menu_fk || !imagen) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        // Convertir la imagen base64 a formato de bytes
        const byteArray = Buffer.from(imagen.split(',')[1], 'base64');
        console.log('IMAGEN CONVERTIDA');
        // Consulta para insertar el restaurante
        const consulta = `INSERT INTO consumible (nombre_consumible, precio_consumible, descripcion_consumible, id_menu_fk, foto_consumible, valoracion_consumible) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

        // Insertar el restaurante y obtener su ID
        const resultado = await pool.query(consulta, [nombre, precio, descripcion, menu_fk, byteArray, valoracion]);
        console.log('CONSUMIBLE REGISTRADO');

        res.json({ message: 'Consumible registrado correctamente' });
    } catch (error) {
        console.error('Error al agregar un nuevo consumible:', error);
        res.status(500).json({ error: 'Error al agregar un nuevo consumible' });
    }
});

app.post('/menu-registrar', async (req, res) => {
    try {
        const { nombre, vigencia, restaurante_fk} = req.body;
        console.log('REGISTRANDO');
        console.log(nombre+' '+vigencia+" "+restaurante_fk);
        if (!nombre || !vigencia || !restaurante_fk) {
            
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }
        const consulta = `INSERT INTO menu (nombre_menu, vigente, id_restaurante_fk) VALUES ($1, $2, $3) RETURNING *`;
        
        const resultadoMenu = await pool.query(consulta, [nombre,vigencia,restaurante_fk]);

        res.json({ message: 'Menu registrado correctamente' });
    } catch (error) {
        console.error('Error al agregar un nuevo menu:', error);
        res.status(500).json({ error: 'Error al agregar un nuevo menu' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor backend iniciado en el puerto ${PORT}`);
  });
