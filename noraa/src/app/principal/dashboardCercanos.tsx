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
                const response = await fetch(`http://localhost:5000/restaurantes-cercanos-limitados?latitud=${lat}&longitud=${lng}&limite=${8}`);
                const data = await response.json();
                setRestaurantesC(data);
            } catch (error) {
                console.error('Error al cargar los restaurantes cercanos:', error);
            }
        }
        cargarCercanos(longitud, latitud);
    }, [centro]);

    return (
        <div className="mt-1 ml-1 mr-1 bg-white" style={{ height: 'auto', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    {restaurantesC.map((restaurante) => (
        <div key={restaurante.id_restaurante} className="card" style={{ height: 'auto', width: '45%', margin: '2%', padding: '10px', border: '1px solid black', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {restaurante.imagen && (
                //<img src={ImgConstructor({ imgBytea: restaurante.imagen })} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="imagen restaurante" />
                <div></div>
            )}
            <div style={{ marginTop: 'auto' }}>
                <h3 className="font-bold">{restaurante.nombre_restaurante}</h3>
                <p>{restaurante.horario_atencion}</p>
                <p>{restaurante.valoracion}</p>
            </div>
        </div>
    ))}
</div>

    );
};

export default DashboardCercanos;




