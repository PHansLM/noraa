import client from '../../utils/baseDeDatos';

const obtenerRestaurantes = async () => {
    console.log('RESTAURANTES EN BUSQEUDA');

    try {

        const consulta = 'SELECT * FROM "public"."restaurante"';
        console.log('Iniciando consulta...');
       // const resultado = await client.query(consulta);
       // return resultado.rows;
    } catch (error) {
        console.log('Error al obtener restaurantes:', error);
     
    };
};

export default obtenerRestaurantes;
