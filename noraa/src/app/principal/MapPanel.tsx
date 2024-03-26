import React from 'react';
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

interface MapPanelProps {
  centro: [number, number] ; // Definimos el tipo para la prop centro como un array de dos números
}

const MapPanel: React.FC<MapPanelProps> = ({ centro }) => {
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <MapContainer center={centro} zoom={10} maxBounds={[[-90, -180], [90, 180]]} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle center={centro} radius={100} /> {/* Radio en metros */}
      </MapContainer>
    </div>
  );
};

export default MapPanel;
