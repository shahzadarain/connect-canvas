import React, { useMemo } from 'react';
import { Layer, Source } from 'react-map-gl';
import { MapPathProps } from './types';
import { generateCurvedPath } from './MapConfig';

const MapPaths: React.FC<{ paths: MapPathProps[] }> = ({ paths }) => {
  const geojson = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: paths.map((path) => ({
        type: 'Feature',
        properties: {
          pathType: path.type,
        },
        geometry: {
          type: 'LineString',
          coordinates: generateCurvedPath(path.start, path.end),
        },
      })),
    };
  }, [paths]);

  return (
    <Source type="geojson" data={geojson}>
      <Layer
        id="path-layer"
        type="line"
        paint={{
          'line-color': [
            'match',
            ['get', 'pathType'],
            'work', '#10B981',
            'mission', '#3B82F6',
            '#ffffff'
          ],
          'line-width': 2,
          'line-opacity': 0.7,
        }}
      />
    </Source>
  );
};

export default MapPaths;