
import { useEffect, useState } from "react";

interface MapPanelProps {
    centro: [number, number];
  }

const DashboardCercanos = ({ centro }: MapPanelProps) => {
    const [restaurantesC, setRestaurantesC] = useState<any[]>([]);
    
    useEffect(() => {
        const [latitud, longitud] = centro;
      
        async function cargarCercanos(lat: number, lng: number) {
          try {
            const response = await fetch(`http://localhost:5000/restaurantes-cercanos-limitados?latitud=${lat}&longitud=${lng}&limite=${10}`);
            const data = await response.json();
            setRestaurantesC(data);
          } catch (error) {
            console.error('Error al cargar los restaurantes cercanos:', error);
          }
        }
      
        cargarCercanos(longitud, latitud);
      
      }, [centro]);
    
    return (
      <div>  
        <div className = "mt-3 ml-3" style={{ height: '30vh', width: '100%' }}> 
          <h2 className="font-bold">Restaurantes Cercanos:</h2>
            {restaurantesC.map((restaurante) => (
                <div key={restaurante.id_restaurante} className="restaurante-div">
                    <h3>{restaurante.nombre_restaurante}</h3>
                    <p>Horario de Atención: {restaurante.horario_atencion}</p>
                    <p>Valoración: {restaurante.valoracion}</p>
                    
                </div>
            ))}
        </div>
      </div>
    );
  };

  export default DashboardCercanos;

  //<img src={`data:image/jpeg;base64,${restaurante.imagen}`} alt="imagen restaurante" />