import React, { useCallback, useMemo } from 'react';
import Map from 'react-map-gl';
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

  return (
    <div className="w-full h-[600px] relative">
      <Map
        {...mapConfig}
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={onMapLoad}
        attributionControl={false}
      >
        <MapPaths paths={paths} />
        <MapMarkers markers={markers} />
      </Map>
    </div>
  );
};

export default WorldMap;