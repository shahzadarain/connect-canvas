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
        projection: 'globe',
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });
      });

      locations.forEach(([name, coordinates]) => {
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'custom-popup'
        }).setHTML(`
          <div class="bg-primary/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <h3 class="text-sm font-bold text-white">${name}</h3>
          </div>
        `);

        const marker = new mapboxgl.Marker({
          color: "#10B981",
          scale: 0.7
        })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        // Show popup on hover
        marker.getElement().addEventListener('mouseenter', () => popup.addTo(map.current!));
        marker.getElement().addEventListener('mouseleave', () => popup.remove());
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
    <section id="impact" className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 animate-fade-in">
          Global Impact Across 15 Countries
        </h2>
        <div className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;