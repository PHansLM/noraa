// useUserLocation.js
const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);
  
    useEffect(() => {
      // Obtiene la ubicación del usuario usando el API de geolocalización del navegador
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        }, (error) => {
          console.error('Error al obtener la ubicacion:', error);
        });
      } else {
        console.error('Geolocalizacion no soportada en el navegador.');
      }
    }, []);
  
    return userLocation;
  };
  
  export default useUserLocation;
  