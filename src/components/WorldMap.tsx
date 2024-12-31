import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { addMarkersToMap } from './map/MapMarker';
import { addMapEffects, addFlightPaths } from './map/MapEffects';
import { type Location } from './map/types';

const locations: Location[] = [
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
        pitch: 45,
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, 'top-right');

      map.current.on('style.load', () => {
        if (!map.current) return;
        
        addMapEffects(map.current);

        // Add country highlight layer
        map.current.addSource('countries', {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1'
        });

        map.current.addLayer({
          'id': 'country-fills',
          'type': 'fill',
          'source': 'countries',
          'source-layer': 'country_boundaries',
          'paint': {
            'fill-color': 'transparent',
            'fill-opacity': 0.5
          }
        });

        map.current.addLayer({
          'id': 'country-fills-hover',
          'type': 'fill',
          'source': 'countries',
          'source-layer': 'country_boundaries',
          'paint': {
            'fill-color': '#8B5CF6',
            'fill-opacity': 0.3
          },
          'filter': ['==', ['get', 'name_en'], '']
        });

        addFlightPaths(map.current, locations);
      });

      // Add hover effect for countries
      map.current.on('mousemove', 'country-fills', (e) => {
        if (e.features && e.features[0].properties) {
          map.current?.setFilter('country-fills-hover', [
            '==',
            ['get', 'name_en'],
            e.features[0].properties.name_en
          ]);
        }
      });

      map.current.on('mouseleave', 'country-fills', () => {
        map.current?.setFilter('country-fills-hover', ['==', ['get', 'name_en'], '']);
      });

      addMarkersToMap(map.current, locations);

      // Globe rotation animation
      const secondsPerRevolution = 240;
      let lastTime = 0;
      const animate = (time: number) => {
        if (lastTime === 0) {
          lastTime = time;
          requestAnimationFrame(animate);
          return;
        }

        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (map.current) {
          const center = map.current.getCenter();
          center.lng -= 40 * delta / secondsPerRevolution;
          map.current.setCenter(center);
        }
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);

      console.log('Map initialized with enhanced features');
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
            Global Impact Across 15 Countries
          </h2>
          <p className="text-lg text-gray-300">
            Transforming communities and creating lasting change around the world
          </p>
        </div>
        <div className="relative w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;