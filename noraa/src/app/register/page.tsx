"use client";
//import Spline from '@splinetool/react-spline';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import useUserLocation from '../utiles/geolocalizadores/useUserLocation';
import 'leaflet/dist/leaflet.css';
import useGeocoder from '../utiles/geolocalizadores/Geocoder';
import TagPopup from '../elementos/TagPopUp';

const Page: React.FC = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerificar, setpasswordVerificar] = useState('');
    const [telefono,setTelefono] = useState('');

    const [intentoSumbit, setIntentoSumbit] = useState(false);

    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [contador, setContador] = useState(10);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (registroExitoso) {
            interval = setInterval(() => {
                setContador((prevContador) => prevContador - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [registroExitoso]);

    useEffect(() => {
        if (contador === 0) {
            window.close();
        }
    }, [contador]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!nombre || !correo || !apellido || !password || !passwordVerificar) {
            setIntentoSumbit(true);
            return;
        }
        if(!(passwordVerificar == password)){
            console.error('Contrasenias no son iguales');  
        }
        try {
            const response = await fetch('http://localhost:5000/usuario-registrar', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    telefono: 77777777,
                    correo: correo,
                    password: password
                })
            });
            if (response.ok) {
                console.log('Usuario registrado exitosamente');
                setRegistroExitoso(true);
                //playSuccessSound();  
            } else {
                console.error('Error al registrar al usuario:', response.statusText);  
            }
        } catch (error) {
            console.error('Error al registrar al usuario:', error);   
        }
    };


    return (
        <section className="bg-gray-50 bg-cover bg-center" style={{ backgroundImage: "url('fondoLogin.jpg')" }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Registrate en Noraa
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                        <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Nombre </label>
                                <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" 
                                        type="text"
                                        placeholder="Ingresa el nombre del usuario"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Apellido </label>
                                <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" 
                                        type="text"
                                        placeholder="Ingresa el apellido de tu negocio"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Correo electronico </label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" placeholder="usuario@email.com" 
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required />
                            </div>
                        
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu contraseña</label>
                                <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" 
                                        onChange={(e) => setpasswordVerificar(e.target.value)}
                                        required />
                            </div>
                            <button type="submit" className="w-full text-white bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ">Registrarse</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Ya estas registrado? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesion</a>
                            </p>
                        </form>
                    </div>
                </div>
                {registroExitoso && (
                    <div className="fixed bottom-0 left-0 w-full bg-green-500 flex justify-center items-center p-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white">¡Usuario registrado exitosamente!</h1>
                            <p className="text-white">{`Cerrando la página automáticamente en ${contador} segundos`}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Page;
