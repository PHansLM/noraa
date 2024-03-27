import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import useUserLocation from './useUserLocation'; 

const Geocoder: React.FC = () => {
  const [direccion, setDireccion] = useState<string>('');
  const userLocation = useUserLocation(); 

  useEffect(() => {
    const obtenerDireccion = async () => {
      setDireccion("-");
        if (userLocation) {
            const response = await axios.get(`https://api.maptiler.com/geocoding/${userLocation.lng},${userLocation.lat}.json?key=N8TAFyC3Qqolu9pUnZdo`);
            const features = response.data.features;
            if (features.length > 0) {
              const direccionFormateada = features[0].place_name;

              setDireccion(direccionFormateada);
            } else {
              setDireccion("Dirección no encontrada");
            }
         
        } else {
          setDireccion("Ubicación no disponible");
        }
    };

    obtenerDireccion();
  }, [userLocation]);

  return <span>{direccion}</span>;
};

export default Geocoder;
