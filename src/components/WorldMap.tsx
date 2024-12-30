import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const locations = [
  { name: "Pakistan", coordinates: [69.3451, 30.3753] },
  { name: "Bangladesh", coordinates: [90.3563, 23.6850] },
  { name: "South Sudan", coordinates: [31.3070, 6.8770] },
  { name: "Sudan", coordinates: [30.2176, 12.8628] },
  { name: "Uganda", coordinates: [32.2903, 1.3733] },
  { name: "Switzerland", coordinates: [8.2275, 46.8182] },
  { name: "Malawi", coordinates: [34.3015, -13.2543] },
  { name: "Greece", coordinates: [21.8243, 39.0742] },
  { name: "Kenya", coordinates: [37.9062, -0.0236] },
  { name: "Ethiopia", coordinates: [40.4897, 9.1450] },
  { name: "Philippines", coordinates: [121.7740, 12.8797] },
  { name: "Jordan", coordinates: [36.2384, 30.5852] },
  { name: "Syria", coordinates: [38.9968, 34.8021] },
  { name: "Tanzania", coordinates: [34.8888, -6.3690] },
  { name: "Rwanda", coordinates: [29.8739, -1.9403] },
];

const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 1.5,
    });

    // Add markers for each location
    locations.forEach(location => {
      const marker = new mapboxgl.Marker({
        color: "#10B981",
      })
        .setLngLat(location.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3 class="text-sm font-bold">${location.name}</h3>`)
        )
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });

    // Cleanup
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
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