"use client";
import React, { useEffect, useState } from 'react';

const RegistroPlatos: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState<string>('');
    const [intentoSumbit, setIntentoSumbit] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [contador, setContador] = useState(10);
    const [email, setEmail] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('');
    const [restauranteEncontrado, setRestauranteEncontrado] = useState(false);
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');

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

    const playSuccessSound = () => {
        const audio = new Audio('correcto.mp3');
        audio.play();
    };

    const buscarRestaurante = () => {
        // Aquí va la lógica para buscar el restaurante
        // Una vez encontrado, se establece restauranteEncontrado en true
        setRestauranteEncontrado(true);
    };

    const handleRegistroPlatillo = () => {
        // Lógica para registrar el platillo
        limpiarCampos();
    };

    const limpiarCampos = () => {
        setNombre('');
        setImagen('');
        setSelectedFile(null);
        setPrecio('');
        setDescripcion('');
    };

    return (
        <div className={`min-h-screen ${registroExitoso ? 'bg-green-500' : 'bg-orange-700'} text-gray-900 flex justify-center`} style={{ backgroundImage: `url('/fondoPlato.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <h1 className="font-bold text-2xl mt-2">Registro de platillos</h1>
                    <form>
                        <div className="mt-1 flex flex-col items-center">
                            <div className="w-full flex-1 mt-7">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico del restaurante</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5"
                                        placeholder="restaurante@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {!restauranteEncontrado && (
                                    <div className="mt-2 flex justify-center">
                                        <button
                                            className="mt-3 tracking-wide font-semibold bg-orange-400 text-white w-full py-4 rounded-3xl hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            type="button"
                                            onClick={buscarRestaurante}
                                        >
                                            Buscar Restaurante
                                        </button>
                                    </div>
                                )}
                                {restauranteEncontrado && (
                                    <div className="mt-2">
                                        <label htmlFor="menu" className="block mb-2 text-sm font-medium text-gray-900 mt-2">Seleccionar Menu</label>
                                        <select
                                            className={`w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                                            id="menu"
                                            value={selectedMenu}
                                            onChange={(e) => setSelectedMenu(e.target.value)}
                                            required
                                        >
                                            <option value="Menu1">Menu1</option>
                                            <option value="Menu2">Menu2</option>
                                            <option value="Menu3">Menu3</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className="mx-auto max-w-xs">
                                <button
                                    className="text-white mt-5 tracking-wide font-semibold bg-orange-400 text-white-500 w-36 py-4 rounded-lg hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    type="submit"
                                >
                                    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path fill="#ffffff" d="M96 80c0-26.5 21.5-48 48-48H432c26.5 0 48 21.5 48 48V384H96V80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48H64V416H512V288h16c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336z" />
                                    </svg>
                                    <span className="ml-2">Guardar</span>
                                </button>
                            </div>

                        </div>

                    </form>
                </div>
                {restauranteEncontrado && (
                    <div className="flex-1 bg-slate-100 text-center hidden lg:flex flex-col rounded-lg p-6">
                        <div className="flex items-center mb-5 w-full mt-16">
                            <div className="flex flex-col w-1/2 mr-2">
                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 text-left">Nombre</label>
                                <input
                                    className={`px-6 py-4 rounded-lg font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${intentoSumbit && !nombre && 'border-red-500'}`}
                                    type="text"
                                    placeholder="Nombre del platillo"
                                // onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="precio" className="block mb-2 text-sm font-medium text-gray-900 text-left">Precio</label>
                                <div className="flex items-center">
                                    <input
                                        className={`w-32 px-4 py-4 rounded-lg font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${intentoSumbit && !nombre && 'border-red-500'}`}
                                        type="number"
                                        placeholder="Precio"
                                    // onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <span className="ml-2">Bs.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full relative">
                            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 text-left">Descripción</label>
                            <textarea
                                className={`px-6 py-4 rounded-lg font-medium bg-white border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${intentoSumbit && !nombre && 'border-red-500'}`}
                                placeholder="Descripción del platillo"
                                rows={4}
                            // onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label
                                htmlFor="logoInput"
                                className={`mt-3 cursor-pointer inline-block ${selectedFile ? 'bg-green-400' : 'bg-gray-100'} border border-black text-black px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-200`}
                            >
                                <img src="/camera.png" alt="Seleccionar Imagen" className="w-6 h-6  inline-block" />
                                {selectedFile ? "Imagen Seleccionada" : ""}
                            </label>
                            <input
                                id="logoInput"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                className="hidden"
                            />
                            {selectedFile && (
                                <p className="mt-2">{selectedFile.name}</p>
                            )}
                        </div>
                        <div className="flex justify-center mt-10">
                            <button
                                className="text-white tracking-wide font-semibold bg-orange-400 text-white-500 w-40 py-4 rounded-xl hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                type="button"
                                onClick={handleRegistroPlatillo}
                            >
                                <span className="ml-2">Registrar platillo</span>
                            </button>
                        </div>


                    </div>
                )}
            </div>
            {registroExitoso && (
                <div className="fixed bottom-0 left-0 w-full bg-green-500 flex justify-center items-center p-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">¡Platillos registrados exitosamente!</h1>
                        <p className="text-white">{`Cerrando la página automáticamente en ${contador} segundos`}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegistroPlatos;
