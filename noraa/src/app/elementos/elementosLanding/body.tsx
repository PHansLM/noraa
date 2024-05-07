import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';

interface AnimatedTextProps {
  children: React.ReactNode;
  animationIn: string;
}

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

const Body = () => {
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0 ml-4 md:ml-20">
        </div>
        <div className="bg-orange-200 pt-10 md:pt-20 pb-4 md:pb-10 flex flex-col md:flex-row items-center justify-center z-10 h-full">
          <div className="mr-4 md:mr-10 max-w-screen-md text-left">
            <AnimatedText animationIn="animate__animated animate__fadeInUp">
              <h1 className="text-orange-700 text-3xl md:text-9xl font-bold mb-2 md:mb-4 mr-4 md:mr-7">Descubre Nuevos Restaurantes</h1>
            </AnimatedText>
            <AnimatedText animationIn="animate__animated animate__fadeInUp">
              <h1 className="text-red-500 text-3xl md:text-9xl font-bold mb-2 md:mb-4 mr-4 md:mr-7">con Noraa</h1>
            </AnimatedText>
            <a href="/home">
              <button type='button' className='text-base md:text-lg mt-4 md:mt-8 lg:mr-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105'>
                Prueba Nora
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center bg-orange-100 py-10 md:py-24'>
        <Spline className="spline-custom-width mt-8 md:mt-16 ml-4 md:ml-64 mr-4 md:mr-[-12] hidden sm:block" scene='https://prod.spline.design/MmcsSjBbaHquvh0x/scene.splinecode'></Spline>
        <div>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <h1 className="text-orange-700 text-4xl md:text-8xl font-bold mt-2 md:mt-8 mb-2 md:mb-0">Sistema de ubicación preciso</h1>
          </AnimatedText>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <p className='mt-4 text-lg md:text-xl mr-4 md:mr-20 font-semibold'>Utilizamos las tecnologías más avanzadas de geolocalización para garantizar una experiencia de usuario excepcional.
              Desde recomendaciones de restaurantes cercanos hasta información sobre eventos locales, estamos comprometidos a proporcionarte la mejor experiencia posible,
              donde quiera que estés.</p>
          </AnimatedText>
          <button type='button' className='text-base md:text-lg mt-4 md:mt-8 lg:mr-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105'>Descubre Open Street Maps</button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center bg-orange-50 py-10 md:py-24'>
        <div className='ml-4 md:ml-40'>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <h1 className="text-orange-700 text-3xl md:text-7xl font-bold mt-2 md:mt-8">Prueba nuestra área de postres</h1>
          </AnimatedText>
          <AnimatedText animationIn="animate__animated animate__fadeInUp">
            <p className='mt-4 text-lg md:text-xl mr-4 md:mr-20 font-semibold'>¿Te encantan los postres tanto como a nosotros? Entonces estás en el lugar adecuado. En nuestra área de postres,
              te espera un mundo de delicias dulces que deleitarán tu paladar y satisfarán tu antojo de algo dulce. Desde clásicos reconfortantes hasta creaciones innovadoras,
              nuestros postres son una experiencia para todos los sentidos. ¿Qué estás esperando? ¡Ven y descubre la deliciosa variedad de postres que tenemos para ti!</p>
          </AnimatedText>
          <button type='button' className='text-base md:text-lg mt-4 md:mt-8 lg:mr-4 text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-2xl px-4 py-2 text-center transition-transform duration-300 ease-in-out transform hover:scale-105'>Area de postres</button>
        </div>
        <Spline className="spline-custom-width mt-8 md:mt-16 ml-4 md:ml-82 hidden sm:block" scene='https://prod.spline.design/hSZXziH7wzQtXobO/scene.splinecode'></Spline>
      </div>
    </>
  );
}

export default Body;
