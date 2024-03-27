import React from 'react';
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon, icon } from 'leaflet';
import { CakeIcon } from '@heroicons/react/16/solid';
import { truncate } from 'fs';

interface MapPanelProps {
  centro: [number, number] ; 
}

const MapPanel: React.FC<MapPanelProps> = ({ centro }) => {
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <MapContainer center={centro} zoom={15} maxBounds={[[-90, -180], [90, 180]]} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle center={centro} radius={4} color='orange' fillColor='orange' />
        <Circle center={centro} radius={500} /> {/* Radio en metros */}
        <Marker alt='Pollos Nova' position={{ lat: -17.39210, lng: -66.14480 }} title='Pollos Nova'  />
     
        <Marker alt='Bunker King' position={{ lat: -17.39423, lng: -66.15052 }} title='Bunker King' />
        <Marker alt='Bowser' position={{ lat: -17.39513, lng: -66.14490 }} title='Bowser' />
        <Marker alt='Salteñas Don Pedro' position={{ lat: -17.39342, lng: -66.14187 }} title='Salteñas Don Pedro' />
        <Marker alt='Empanadas Ale' position={{ lat: -17.39298, lng: -66.14946 }} title='Empadanas Ale' />
      </MapContainer>
    </div>
  );
};

export default MapPanel;
