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
      {restaurante !== null && (
        <div>
          {restaurante.imagen && (
            <ImgConstructor
              imgBytea={restaurante.imagen}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              className="rounded-t-lg h-80 sm:h-auto sm:w-48 sm:rounded-none sm:rounded-l-lg max-w-full"
            />
          )}
          <p>Nombre: {restaurante.nombre_restaurante}</p>
          <p>Dirección: {restaurante.direccion}</p>
          <p>Teléfono: {restaurante.telefono}</p>
          <p>Horario de atención: {restaurante.horario_atencion}</p>
          <p>Valoración: {restaurante.valoracion}</p>
          
        
          <div>
            {menus.map(menu => (
              <div className = 'mt-5 mb-5'key={menu.id_menu}>
                <h3 className='font-semibold text-lg mb-5'>{menu.nombre_menu}</h3>
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
