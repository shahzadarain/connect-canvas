import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { locations, mapConfig } from './map/MapConfig';
import { addMarkers } from './map/MapMarkers';
import { addAnimatedPaths, createPulsingDot } from './map/MapPaths';

const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZWVyeCIsImEiOiJjbTR2dG10aGcwNnY2MmlzYml2bWV3MXQ1In0.i1afv65TWj9-t5r5mWOaEQ';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapConfig.style,
        center: mapConfig.center as [number, number],
        zoom: mapConfig.zoom,
        projection: mapConfig.projection as mapboxgl.ProjectionSpecification
      });

      map.current.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true,
      }), 'top-right');

      map.current.on('load', () => {
        if (!map.current) return;
        
        createPulsingDot(map.current);
        addMarkers(map.current, locations);
        addAnimatedPaths(map.current, locations);

        // Add atmospheric effects
        map.current.setFog({
          'color': 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.8
        });

        console.log('Map initialized with location markers and animated paths');
      });
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
    <section id="journey" className="py-24 bg-gradient-to-b from-[#2C3E50] via-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 relative">
        <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;