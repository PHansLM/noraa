import React, { useEffect, useState } from 'react';
import { cargarPlatillosPorMenu } from '../utiles/consultores/restaurantes';

interface MenuPlatillosProps {
  idMenu: number;
}

const MenuPlatillos: React.FC<MenuPlatillosProps> = ({ idMenu }) => {
  const [platillos, setPlatillos] = useState<any[]>([]);

  useEffect(() => {
    if (idMenu) {
      cargarPlatillosPorMenu(idMenu)
        .then(data => {
          setPlatillos(data);
        })
        .catch(error => {
          console.error('Error al cargar los platillos del menú:', error);
        });
    }
  }, [idMenu]);

  return (
    <div>
      {platillos.length > 0 ? (
        <ul>
          {platillos.map(platillo => (
            <li key={platillo.id_consumible}>
              <p>Nombre: {platillo.nombre_consumible}</p>
              <p>Descripción: {platillo.descripcion_consumible}</p>
              <p>Precio: {platillo.precio_consumible}</p>
              <p>Valoracion: {platillo.valoracion_consumible}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay platillos en este menú.</p>
      )}
    </div>
  );
};

export default MenuPlatillos;
