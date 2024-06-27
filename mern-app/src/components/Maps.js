import React, { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '../utils/loadGoogleMaps';

const Maps = ({ coordinates }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadGoogleMaps('"AIzaSyDegNkC-GwWieiu1tjffn8e0JZt9ikMyvc"'); // Replace with your actual API key
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: coordinates.lat, lng: coordinates.lng }, // Correct order here
          zoom: 20,
        });
        mapInstanceRef.current = map;

        new window.google.maps.Marker({
          position: { lat: coordinates.lat, lng: coordinates.lng }, // Correct order here
          map: map,
        });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initializeMap();
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Maps;
