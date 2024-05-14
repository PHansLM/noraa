const Page: React.FC = () => {
    return (
        <section className="bg-gray-50 bg-cover bg-center" style={{ backgroundImage: "url('fondoLogin.jpg')" }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Registrate en Noraa
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Nombre </label>
                                <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5"  required />
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 ">Apellido </label>
                                <input  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5"  required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Correo electronico </label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" placeholder="usuario@email.com" required />
                            </div>
                        
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirma tu contraseña</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-full p-2.5" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-orange-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ">Registrarse</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Ya estas registrado? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesion</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;
