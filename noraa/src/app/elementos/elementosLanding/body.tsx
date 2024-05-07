"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Importa ScrollAnimation como un componente dinámico para garantizar su uso solo en el cliente
const ScrollAnimation = dynamic(() => import('react-animate-on-scroll'), { ssr: false });
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';

// Definir la interfaz AnimatedTextProps
interface AnimatedTextProps {
  children: React.ReactNode;
  animationIn: string;
}

// Define el componente AnimatedText
const AnimatedText: React.FC<AnimatedTextProps> = ({ children, animationIn }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <ScrollAnimation animateIn={animationIn}>
      {children}
    </ScrollAnimation>
  );
};

// Define el componente Body
const Body = () => {
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0 ml-20">
        </div>
        <div className="bg-orange-200 pt-20 pb-10 flex flex-col md:flex-row items-center justify-center z-10 h-full">
          <div className="mr-10 max-w-screen-md text-left">
            <AnimatedText animationIn="animate__animated animate__fadeInUp">
              <h1 className="text-orange-700 lg:text-9xl font-bold text-2xl mb-4 mr-7">Descubre Nuevos Restaurantes</h1>
            </AnimatedText>
            <AnimatedText animationIn="animate__animated animate__fadeInUp">
              <h1 className="text-red-500 lg:text-9xl font-bold text-2xl mb-4 mr-7">con Noraa</h1>
            </AnimatedText>
            <a href="/home">
              <button type='button' className='text-lg mt-8 lg:mr-4 text-white lg:text-lg bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105'>
                Prueba nora
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-center items-center bg-orange-100 py-24'>
        <Spline className="spline-custom-width mt-16 ml-64 mr-[-12]" scene='https://prod.spline.design/MmcsSjBbaHquvh0x/scene.splinecode'></Spline>
        <div>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <h1 className="text-orange-700 lg:text-8xl font-bold mt-8  ">Sistema de ubicación preciso</h1>
          </AnimatedText>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <p className='mt-16 text-xl mr-20 font-semibold'>Utilizamos las tecnologías más avanzadas de geolocalización para garantizar una experiencia de usuario excepcional.
              Desde recomendaciones de restaurantes cercanos hasta información sobre eventos locales, estamos comprometidos a proporcionarte la mejor experiencia posible,
              donde quiera que estés.</p>
          </AnimatedText>
          <a href="https://www.openstreetmap.org" target='_blank'>
           <button type='button' className='mt-8 lg:mr-4 text-white lg:text-lg bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center text-sm transition-transform duration-300 ease-in-out transform hover:scale-105'>Descubre Open Street Maps</button>  
          </a>
          
        </div>
      </div>

      <div className='flex flex-row justify-center items-center bg-orange-50 py-24'>
        <div className='ml-40'>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <h1 className="text-orange-700 lg:text-7xl font-bold mt-8">Prueba nuestra área de postres</h1>
          </AnimatedText>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <p className='mt-16 text-xl mr-20 font-semibold'>¿Te encantan los postres tanto como a nosotros? Entonces estás en el lugar adecuado. En nuestra área de postres,
              te espera un mundo de delicias dulces que deleitarán tu paladar y satisfarán tu antojo de algo dulce. Desde clásicos reconfortantes hasta creaciones innovadoras,
              nuestros postres son una experiencia para todos los sentidos. ¿Qué estás esperando? ¡Ven y descubre la deliciosa variedad de postres que tenemos para ti!</p>
          </AnimatedText>
          <button type='button' className='mt-8 lg:mr-4 text-white lg:text-lg bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center text-sm transition-transform duration-300 ease-in-out transform hover:scale-105'>Area de postres</button>
        </div>
        <Spline className="spline-custom-width mt-16 ml-82" scene='https://prod.spline.design/hSZXziH7wzQtXobO/scene.splinecode'></Spline>
      </div>
    </>
  );
}

export default Body;
