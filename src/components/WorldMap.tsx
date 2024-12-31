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
        pitch: 45, // Added pitch for more dimension
      });

      // Add navigation controls with custom styling
      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, 'top-right');

      // Enhanced atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          'range': [0.8, 8],
          'color': 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.8
        });

        // Add 3D terrain
        map.current?.setTerrain({
          'source': 'mapbox-dem',
          'exaggeration': 1.5
        });
      });

      // Custom marker creation function
      const createCustomMarker = (coordinates: [number, number]) => {
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerHTML = `
          <div class="w-4 h-4 bg-[#8B5CF6] rounded-full animate-pulse shadow-lg shadow-purple-500/50 
                      ring-4 ring-purple-400/30 hover:ring-purple-400/50 transition-all duration-300">
          </div>
        `;
        return new mapboxgl.Marker(el);
      };

      locations.forEach(([name, coordinates]) => {
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'custom-popup',
          offset: [0, -10]
        }).setHTML(`
          <div class="bg-[#1A1F2C]/90 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-xl border border-purple-500/20
                      transform transition-all duration-300 hover:scale-105">
            <h3 class="text-sm font-bold text-white">${name}</h3>
          </div>
        `);

        const marker = createCustomMarker(coordinates)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current!);

        // Enhanced popup interaction
        const markerEl = marker.getElement();
        markerEl.addEventListener('mouseenter', () => {
          popup.addTo(map.current!);
          markerEl.classList.add('scale-125');
        });
        markerEl.addEventListener('mouseleave', () => {
          popup.remove();
          markerEl.classList.remove('scale-125');
        });
      });

      // Add rotation animation
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

      console.log('Map initialized successfully with enhanced features');
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