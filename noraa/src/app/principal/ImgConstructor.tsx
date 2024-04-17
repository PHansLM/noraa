import React from 'react';

interface ImgConstructorProps {
    imgBytea: string;
}

const ImgConstructor: React.FC<ImgConstructorProps> = ({ imgBytea }) => {
    const construirUrlImagen = (imgBytea: string) => {
        // Convertir cadena base64 a un ArrayBuffer
        const arrayBuffer = Buffer.from(imgBytea, 'base64').buffer;
        // Crear un Blob a partir del ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        // Crear una URL para el Blob
        return URL.createObjectURL(blob);
    };

    return <img src={construirUrlImagen(imgBytea)} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
};

export default ImgConstructor;
