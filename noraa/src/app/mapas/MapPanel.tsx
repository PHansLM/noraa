import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cargarRestaurantes } from '../utiles/consultores/restaurantes';
import { cargarAvistamientos } from '../utiles/consultores/avistamientos';

interface MapPanelProps {
  centro: [number, number];
}

const MapPanel: React.FC<MapPanelProps> = ({ centro }: MapPanelProps) => {
  const [restaurantes, setRestaurantes] = useState<any[]>([]);
  const [avistamientos, setAvistamientos] = useState<any[]>([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    // Cargar todos los restaurantes
    cargarRestaurantes()
      .then(data => {
        setRestaurantes(data);
      })
      .catch(error => {
        console.error('Error al cargar todos los restaurantes:', error);
      });

    cargarAvistamientos()
      .then(data => {
        setAvistamientos(data);
      })
      .catch(error => {
        console.error('Error al cargar avistamientos en el map Panel', error);
      });
  }, [centro]);

  const handleMapClick = () => {
    setShowDetail(false);
  };

  const handleMarkerClick = (restaurante: any) => {
    setRestauranteSeleccionado(restaurante);
    setShowDetail(true);
  };

  return (
    <div onClick={handleMapClick}>
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        <MapContainer center={centro} zoom={16} minZoom={10} maxZoom={20}
          maxBounds={[[-90, -180], [90, 180]]}
          style={{ height: '100%', width: '100%' }}
        >
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
              eventHandlers={{
                click: (e) => {
                  e.originalEvent.stopPropagation();
                  handleMarkerClick(restaurante);
                },
              }}
            >
              <Popup>
                <h3>{restaurante.nombre_restaurante}</h3>
              </Popup>
            </Marker>
          ))}

          {avistamientos.map((avistamiento) => (
            <Marker
              key={avistamiento.id_avistamiento}
              position={[avistamiento.coordenada_latitud, avistamiento.coordenada_longitud]}
              icon={L.icon({
                iconUrl: avistamiento.icono + ".png",
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16],
              })}
            >
              <Popup>
                <div>
                  <h3>{avistamiento.nombre_restaurante}</h3>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {showDetail && restauranteSeleccionado && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              padding: '1em',
              boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              zIndex: 1000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{restauranteSeleccionado.nombre_restaurante}</h2>
            <p>{restauranteSeleccionado.direccion}</p>
            <p>{restauranteSeleccionado.descripcion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPanel;
