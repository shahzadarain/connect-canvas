import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type Location } from './map/types';

const locations: Location[] = [
  ["Pakistan", [69.3451, 30.3753], "Digital Transformation Lead"],
  ["Bangladesh", [90.3563, 23.6850], "Technology Consultant"],
  ["South Sudan", [31.3070, 6.8770], "IT Solutions Architect"],
  ["Sudan", [30.2176, 12.8628], "Digital Innovation Lead"],
  ["Uganda", [32.2903, 1.3733], "Technology Advisor"],
  ["Switzerland", [8.2275, 46.8182], "Senior Technology Consultant"],
  ["Malawi", [34.3015, -13.2543], "Digital Solutions Lead"],
  ["Greece", [21.8243, 39.0742], "Technology Operations Manager"],
  ["Kenya", [37.9062, -0.0236], "Digital Transformation Specialist"],
  ["Ethiopia", [40.4897, 9.1450], "IT Project Lead"],
  ["Philippines", [121.7740, 12.8797], "Technology Consultant"],
  ["Jordan", [36.2384, 30.5852], "Head of Digital Solutions"],
  ["Syria", [38.9968, 34.8021], "Digital Operations Lead"],
  ["Tanzania", [34.8888, -6.3690], "Technology Solutions Architect"],
  ["Rwanda", [29.8739, -1.9403], "Digital Innovation Specialist"],
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
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 20],
        zoom: 1.8,
        projection: 'mercator',
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, 'top-right');

      // Add markers for each location
      locations.forEach(([name, coordinates, role]) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerHTML = `
          <div class="w-4 h-4 bg-primary rounded-full animate-pulse 
                      shadow-lg shadow-primary/50 ring-4 ring-primary/30 
                      hover:ring-primary/50 transition-all duration-300">
          </div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'custom-popup',
          offset: [0, -10]
        }).setHTML(`
          <div class="bg-card/90 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-xl 
                      border border-primary/20 transform transition-all duration-300 
                      hover:scale-105">
            <h3 class="text-sm font-bold text-primary">${name}</h3>
            <p class="text-xs text-primary/80 mt-1">${role}</p>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current!);

        // Show popup on hover
        el.addEventListener('mouseenter', () => popup.addTo(map.current!));
        el.addEventListener('mouseleave', () => popup.remove());
      });

      console.log('Map initialized with location markers');
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
    <section id="impact" className="py-24 bg-gradient-to-b from-primary via-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Global Work Experience
          </h2>
          <p className="text-lg text-gray-300">
            Contributing to digital transformation across diverse regions
          </p>
        </div>
        <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;