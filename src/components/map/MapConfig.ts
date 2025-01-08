import type { MapProps } from 'react-map-gl';

export const mapConfig: Partial<MapProps> = {
  mapStyle: 'mapbox://styles/mapbox/dark-v11',
  projection: { name: 'globe' as const },
  initialViewState: {
    longitude: -100,
    latitude: 40,
    zoom: 1.5,
    maxZoom: 20,
    pitch: 0,
    bearing: 0,
  },
  minZoom: 0.5,
  maxZoom: 20,
  dragRotate: true,
};