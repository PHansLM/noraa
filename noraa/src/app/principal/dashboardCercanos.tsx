import { useEffect, useState } from "react";
//import ImgConstructor from "./ImgConstructor";

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
        <div className="mt-1 ml-1 mr-1 bg-orange-200" style={{ height: '30vh', width: '100%' }}>
            {restaurantesC.map((restaurante) => (
                <div key={restaurante.id_restaurante} className="" style={{ height: '35%', width: '35%' }}>
                    {restaurante.imagen && (
                        //<img src={ImgConstructor({ imgBytea: restaurante.imagen })} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="imagen restaurante" />
                        <div></div>
                    )}
                    <h3 className="font-bold">{restaurante.nombre_restaurante}</h3>
                    <p>{restaurante.horario_atencion}</p>
                    <p>{restaurante.valoracion}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardCercanos;
