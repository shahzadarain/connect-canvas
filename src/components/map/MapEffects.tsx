import mapboxgl from 'mapbox-gl';
import { type Location, type RouteFeature } from './types';

export const addMapEffects = (map: mapboxgl.Map) => {
  map.setFog({
    'range': [0.8, 8],
    'color': 'rgb(186, 210, 235)',
    'high-color': 'rgb(36, 92, 223)',
    'horizon-blend': 0.4,
    'space-color': 'rgb(11, 11, 25)',
    'star-intensity': 0.8
  });

  map.setTerrain({
    'source': 'mapbox-dem',
    'exaggeration': 1.5
  });
};

export const addFlightPaths = (map: mapboxgl.Map, locations: Location[]) => {
  locations.forEach((_, i) => {
    if (i < locations.length - 1) {
      const from = locations[i][1];
      const to = locations[i + 1][1];
      
      const route: RouteFeature = {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': [from, to]
        }
      };

      map.addSource(`route-${i}`, {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [route]
        }
      });

      map.addLayer({
        'id': `route-${i}`,
        'source': `route-${i}`,
        'type': 'line',
        'paint': {
          'line-color': '#8B5CF6',
          'line-width': 2,
          'line-opacity': 0.6,
          'line-dasharray': [0, 4, 3]
        }
      });
    }
  });
};