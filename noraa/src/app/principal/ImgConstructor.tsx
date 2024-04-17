const ImgConstructor = ({ imgBytea }: { imgBytea: Uint8Array }) => {
    let counter = 0;

    const construirImagenUrl = (imgBytea: Uint8Array): string => {
        if (imgBytea) {
            const blob = new Blob([imgBytea], { type: 'image/jpg' });
            const imageUrl = URL.createObjectURL(blob);
            console.log('imagen cargada:' + imageUrl);
            return imageUrl;
        } else {
            return ''; 
        }
    };

    return construirImagenUrl(imgBytea);
};

export default ImgConstructor;
