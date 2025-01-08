import React, { useCallback, useMemo, useEffect } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig, workLocations, missionLocations } from './map/MapConfig';
import MapMarkers from './map/MapMarkers';
import MapPaths from './map/MapPaths';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const WorldMap = () => {
  const markers = useMemo(() => {
    return [
      ...workLocations.map(location => ({ location, type: 'work' as const })),
      ...missionLocations.map(location => ({ location, type: 'mission' as const })),
    ];
  }, []);

  const paths = useMemo(() => {
    const switzerlandCoords = workLocations.find(loc => loc.id === 'switzerland')?.coordinates;
    if (!switzerlandCoords) return [];

    return [
      // Work location paths (chronological)
      ...workLocations.slice(0, -1).map((loc, index) => ({
        start: loc.coordinates,
        end: workLocations[index + 1].coordinates,
        type: 'work' as const,
      })),
      // Mission paths from Switzerland
      ...missionLocations.map(loc => ({
        start: switzerlandCoords,
        end: loc.coordinates,
        type: 'mission' as const,
      })),
    ];
  }, []);

  const onMapLoad = useCallback(() => {
    console.log('Map loaded successfully');
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Please add your Mapbox token to the environment variables.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={onMapLoad}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          longitude: 0,
          latitude: 20,
          zoom: 1.5,
          pitch: 0,
          bearing: 0,
        }}
        projection={{ name: 'globe' as const }}
      >
        <NavigationControl position="top-right" />
        <MapPaths paths={paths} />
        <MapMarkers markers={markers} />
      </Map>
    </div>
  );
};

export default WorldMap;