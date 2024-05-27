import React, { useEffect, useState } from 'react';
import { cargarRestaurantePorId, cargarMenusDeUnRestaurante } from '../utiles/consultores/restaurantes';
import ImgConstructor from '../utiles/multimedia/ImgConstructor';
import MenuPlatillos from './MenuPlatillos'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto

interface InfoRestauranteProps {
  idRestaurante: string;
}

const InfoRestaurante: React.FC<InfoRestauranteProps> = ({ idRestaurante }) => {
  const [restaurante, setRestaurante] = useState<any>();
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    if (idRestaurante !== "") {
      cargarRestaurantePorId(idRestaurante)
        .then(data => {
          if (data && data.length > 0) {
            setRestaurante(data[0]);
            cargarMenusDeUnRestaurante(idRestaurante)
              .then(menusData => {
                setMenus(menusData);
              })
              .catch(error => {
                console.error('Error al cargar los menús del restaurante:', error);
              });
          } else {
            console.error('No hay restaurantes con ese ID');
            setRestaurante(null);
          }
        })
        .catch(error => {
          console.error('Error al obtener restaurante por ID:', error);
          setRestaurante(null);
        });
    } else {
      setRestaurante(null);
    }
  }, [idRestaurante]);

  if (typeof restaurante === 'undefined') {
    return null;
  }

  return (
    <div>
      <h1>Información del Restaurante</h1>
      {restaurante !== null && (
        <div>
          {restaurante.imagen && (
            <ImgConstructor
              imgBytea={restaurante.imagen}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              className="rounded-t-lg h-80 sm:h-auto sm:w-48 sm:rounded-none sm:rounded-l-lg max-w-full"
            />
          )}
          
          <p>ID: {idRestaurante}</p>
          <p>Nombre: {restaurante.nombre_restaurante}</p>
          <p>Dirección: {restaurante.direccion}</p>
          <p>Teléfono: {restaurante.telefono}</p>
          <p>Horario de atención: {restaurante.horario_atencion}</p>
          <p>Valoración: {restaurante.valoracion}</p>
          
          {/* Menús */}
          <div>
            <h2>MENÚ:</h2>
            {menus.map(menu => (
              <div key={menu.id_menu}>
                <h3>Menú {menu.nombre_menu}</h3>
                <MenuPlatillos idMenu={menu.id_menu} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoRestaurante;
