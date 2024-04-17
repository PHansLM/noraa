import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker,Popup, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapPanelProps {
  centro: [number, number];
}

  const MapPanel: React.FC<MapPanelProps> = ({ centro }: MapPanelProps) => {
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [restaurantesC, setRestaurantesC] = useState<any[]>([]);

useEffect(() => {
  const [latitud, longitud] = centro;

  async function cargarCercanos(lat: number, lng: number) {
    try {
      const response = await fetch(`http://localhost:5000/restaurantes-cercanos?latitud=${lat}&longitud=${lng}`);
      const data = await response.json();
      setRestaurantesC(data);
    } catch (error) {
      console.error('Error al cargar los restaurantes cercanos:', error);
    }
  }

  async function cargarRestaurantes() {
    try {
        const response = await fetch('http://localhost:5000/restaurantes');
        const data = await response.json();
        setRestaurantes(data);
    } catch (error) {
        console.error('Error al cargar los restaurantes:', error);
    }
}
  cargarRestaurantes();

  cargarCercanos(longitud, latitud);

}, [centro]);


  return (
    <div>
      <div style={{ height: '70vh', width: '100%' }}>
        <MapContainer center={centro} zoom={16} minZoom={10} maxZoom={20} maxBounds={[[-90, -180], [90, 180]]} style={{ height: '90%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle center={centro} radius={700} />
          <Marker position={centro} icon={L.icon({
            iconUrl: 'ubActual.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16],
          })} />
            
          {/* Marcadores de restaurantes */}
          {restaurantes.map((restaurante) => (
            <Marker
              key={restaurante.id_restaurante}
              position={[restaurante.coordenada_latitud, restaurante.coordenada_longitud]}
              icon={L.icon({
                iconUrl: restaurante.icono_base + ".png",
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16],
              })}
            >
              <Popup>
                <div>
                    <h3>{restaurante.nombre_restaurante }</h3>
                    <ImgConstructor imgBytea={restaurante.imagen} height='80px' width='80px'/>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>

      <div className = "md:mt-3 md:ml-3 ml-2" style={{ height: '30vh', width: '100%' }}> 
        <h2 className="font-bold">Restaurantes Cercanos:</h2>
        <ul className='ml-2'>
          {restaurantesC.map((restaurantec) => (
            <li key={restaurantec.id_restaurante}>{restaurantec.nombre_restaurante}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapPanel;
