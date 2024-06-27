// src/utils/loadGoogleMaps.js
let googleMapsPromise;

export function loadGoogleMaps(apiKey) {
  if (!googleMapsPromise) {
    googleMapsPromise = new Promise((resolve, reject) => {
      if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        resolve(window.google.maps);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyDegNkC-GwWieiu1tjffn8e0JZt9ikMyvc"}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve(window.google.maps);
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.head.appendChild(script);
    });
  }

  return googleMapsPromise;
}
