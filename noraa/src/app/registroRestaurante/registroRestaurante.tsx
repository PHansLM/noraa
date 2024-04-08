"use client";
//import Spline from '@splinetool/react-spline';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import useUserLocation from '../principal/useUserLocation';
import 'leaflet/dist/leaflet.css';
import useGeocoder from '../principal/Geocoder';



const RegistroRestaurante: React.FC = () => {

    const [primerUso, setPrimerUso] = useState(true);

    const userLocationLat = useUserLocation()?.lat;
    const userLocationLng = useUserLocation()?.lng;

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState<string>(''); // Dejar como estado editable
    const [horaEntrada, setHoraEntrada] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [icono, setIcono] = useState('');
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);  
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar si el modal está abierto
    
    const { direccion: direccionGeocoder } = useGeocoder({ lat: latitud, lng: longitud});

    useEffect(() => {
        if (primerUso && userLocationLat !== undefined && userLocationLng !== undefined) {
            setLatitud(userLocationLat);
            setLongitud(userLocationLng);
            setPrimerUso(false);
        }
    }, [userLocationLat, userLocationLng, primerUso]);

    useEffect(() => {
        setDireccion(direccionGeocoder);
    }, [direccionGeocoder]);

    const MapEventHandler = () => {
        const map = useMapEvents({
            moveend: () => {
                const center = map.getCenter();
                const latC = parseFloat(center.lat.toFixed(5));
                const lngC = parseFloat(center.lng.toFixed(5));
                console.log(latC + "  " + lngC);
                setLatitud(latC);
                setLongitud(lngC);
            },
        });
        return null;
    };
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/restaurantes-registrar', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_restaurante: nombre,
                    direccion: direccion,
                    telefono: telefono,
                    horario_atencion: `${horaEntrada}-${horaSalida}`,
                    coordenada_longitud: longitud,
                    coordenada_latitud: latitud,
                    valoracion: 2.0,
                    icono_base: icono
                })
            });
            if (response.ok) {
                console.log('Restaurante registrado exitosamente');
                // Aquí puedes manejar la redirección o mostrar un mensaje de éxito
            } else {
                console.error('Error al registrar el restaurante:', response.statusText);
                // Aquí puedes mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error al registrar el restaurante:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        
        <div className="min-h-screen bg-orange-800 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <h1 className="font-bold text-2xl mt-2">Registra tu negocio</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-1 flex flex-col items-center">
                            <div className="w-full flex-1 mt-2">
                                <div className="mx-auto max-w-xs">
                                    <h1 className="font-semibold mt-2">Nombre del negocio</h1>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                        type="text" placeholder="Ingresa el nombre de tu negocio"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />
                                    <h1 className="font-semibold mt-2">Correo electrónico</h1>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                        type="email" placeholder="Ej: ejemplo@gmail.com"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)} />
                                    <h1 className="font-semibold mt-2">Telefono</h1>
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                                        type="number" placeholder="Ej: 77777777"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)} />

                                    <h1 className="font-semibold mt-2">Direccion</h1>
                                    <button
                                        className="mt-3 tracking-wide font-semibold bg-orange-400 text-white w-full py-4 rounded-3xl hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        onClick={openModal}
                                    >
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                            <path fill="#ffffff"
                                                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7"></path>
                                        </svg>
                                        <span>{direccion}</span>
                                    </button>

                                    {/* Horas de entrada y salida */}
                                    <div className="flex mt-5 font-semibold">
                                        <h1>Hora de entrada</h1>
                                        <h1 className="ml-10">Hora de salida</h1>
                                    </div>
                                    <div className="flex mt-2">
                                        <input
                                            className="w-1/2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="time" placeholder="Hora de entrada"
                                            value={horaEntrada}
                                            onChange={(e) => setHoraEntrada(e.target.value)} />
                                        <input
                                            className="w-1/2 ml-2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type="time" placeholder="Hora de salida"
                                            value={horaSalida}
                                            onChange={(e) => setHoraSalida(e.target.value)} />
                                    </div>

                                    {/* Selección de icono */}
                                    <div className="mt-5">
                                        <h1 className="font-semibold">Icono en el mapa</h1>
                                        <select
                                            className="mt-3 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            value={icono}
                                            onChange={(e) => setIcono(e.target.value)}
                                        >
                                            <option value="">Ninguno</option>
                                            <option value="pollo">Pollo</option>
                                            <option value="hamburguesa">Hamburguesa</option>
                                            <option value="pension">Pensión</option>
                                            <option value="bebida">Bebida</option>
                                            <option value="helado">Helado</option>
                                            <option value="empanada">Saltena</option>
                                        </select>
                                    </div>

                                    {/* Botón de registro */}
                                    <button
                                        className="text-white mt-5 tracking-wide font-semibold bg-orange-400 text-white-500 w-full py-4 rounded-lg hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                        type="submit"
                                    >
                                        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512">
                                            <path fill="#ffffff"
                                                d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z" />
                                        </svg>
                                        <span className="ml-2">
                                            Registrar
                                        </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex-1 bg-green-100 text-center hidden lg:flex rounded-lg"
                    style={{ backgroundImage: "url('fondo.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="m-12 xl:m-16 w-full" />
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h1>{latitud+'   '+longitud}</h1>
                <div style={{ position: 'relative', height: '70%', width: '70%' }}>
                    <MapContainer center={[latitud, longitud]} zoom={13} style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MapEventHandler />
                    </MapContainer>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
                        <img src="https://cdn-icons-png.freepik.com/512/535/535239.png" alt="icono" style={{ width: '32px', height: '32px' }} />
                    </div>
                </div>
                <button onClick={closeModal}>Cerrar</button>
            </Modal>
        </div>
    );
};

export default RegistroRestaurante;
