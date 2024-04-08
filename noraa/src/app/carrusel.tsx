import { useEffect, useState } from 'react';

const Carrusel = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderImages = () => {
        const isMobile = windowSize < 768; 

        return (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 pt-3 lg:mt-4 lg:ml-5 lg:mr-5 mr-3 ml-3">
                {["restaurantes", "postres", "bebidas", "callejera"].map((imageName, index) => (
                    <div className="flex justify-center" key={index}>
                        <img
                            className="h-auto max-w-full rounded-lg hover:cursor-pointer hover:transform lg:hover:scale-105 transition duration-300 ease-in-out"
                            style={{ maxWidth: isMobile ? "190px" : "none", width: "90%" }}
                            src={`${imageName}.png`}
                        />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="lg:flex lg:justify-center">
            {renderImages()}
        </div>
    );
};

export default Carrusel;