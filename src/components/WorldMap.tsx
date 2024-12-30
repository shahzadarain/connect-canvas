import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const locations: [string, [number, number]][] = [
  ["Pakistan", [69.3451, 30.3753]],
  ["Bangladesh", [90.3563, 23.6850]],
  ["South Sudan", [31.3070, 6.8770]],
  ["Sudan", [30.2176, 12.8628]],
  ["Uganda", [32.2903, 1.3733]],
  ["Switzerland", [8.2275, 46.8182]],
  ["Malawi", [34.3015, -13.2543]],
  ["Greece", [21.8243, 39.0742]],
  ["Kenya", [37.9062, -0.0236]],
  ["Ethiopia", [40.4897, 9.1450]],
  ["Philippines", [121.7740, 12.8797]],
  ["Jordan", [36.2384, 30.5852]],
  ["Syria", [38.9968, 34.8021]],
  ["Tanzania", [34.8888, -6.3690]],
  ["Rwanda", [29.8739, -1.9403]],
];

const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZWVyeCIsImEiOiJjbTR2dG10aGcwNnY2MmlzYml2bWV3MXQ1In0.i1afv65TWj9-t5r5mWOaEQ';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 1.5,
      });

      locations.forEach(([name, coordinates]) => {
        new mapboxgl.Marker({
          color: "#10B981",
        })
          .setLngLat(coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3 class="text-sm font-bold">${name}</h3>`)
          )
          .addTo(map.current!);
      });

      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Global Impact Across 15 Countries
        </h2>
        <div className="relative w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;