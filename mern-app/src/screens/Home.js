import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Home() {
  const [coordinates, setCoordinates] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [directionsList, setDirectionsList] = useState([]);
  const [totalDistance, setTotalDistance] = useState(null);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDegNkC-GwWieiu1tjffn8e0JZt9ikMyvc', // Add your Google Maps API key here
    libraries,
  });

  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      const [lat, long] = storedLocation.replace('Lat: ', '').replace('Long: ', '').split(', ');
      setCoordinates({ lat: parseFloat(lat), lng: parseFloat(long) });
    }
  }, []);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const destination = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      setDestinations([...destinations, destination]);
    } else {
      console.error("No details available for input: '" + place.name + "'");
    }
  };

  useEffect(() => {
    if (destinations.length > 0) {
      const directionsService = new window.google.maps.DirectionsService();
      const waypoints = destinations.slice(1, destinations.length - 1).map(dest => ({ location: dest }));

      directionsService.route(
        {
          origin: coordinates,
          destination: destinations[destinations.length - 1],
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsList([...directionsList, result]);

            const totalDist = result.routes[0].legs.reduce((acc, leg) => acc + leg.distance.value, 0);
            setTotalDistance((prevTotal) => (prevTotal || 0) + totalDist);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [destinations]);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <Navbar />
      <div className='m-3'>
        {coordinates ? (
          <div>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={destinations.length > 0 ? 10 : 20}
              center={coordinates}
              options={options}
            >
              <Marker position={coordinates} />
              {directionsList.map((directions, index) => (
                <DirectionsRenderer key={index} directions={directions} />
              ))}
              <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
                <input
                  type="text"
                  placeholder="Enter a destination"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px",
                    marginTop: "10px",
                  }}
                />
              </Autocomplete>
            </GoogleMap>
            {totalDistance && (
              <div style={{ marginTop: '20px', fontSize: '18px' }}>
                Total Distance: {(totalDistance / 1000).toFixed(2)} km
              </div>
            )}
          </div>
        ) : (
          <p>No location data available.</p>
        )}
      </div>
      <div className='m-3'>
        <Footer />  
      </div>
    </div>
  );
}
