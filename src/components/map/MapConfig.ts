import type { MapProps } from 'react-map-gl';
import type { MapLocation } from './types';

// Work and mission locations data
export const workLocations: MapLocation[] = [
  {
    id: 'switzerland',
    name: 'Switzerland',
    coordinates: [8.5417, 47.3769],
    roles: ['AI Research Lead'],
    timePeriod: '2023-Present'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    coordinates: [103.8198, 1.3521],
    roles: ['Senior Data Scientist'],
    timePeriod: '2021-2023'
  }
];

export const missionLocations: MapLocation[] = [
  {
    id: 'kenya',
    name: 'Kenya',
    coordinates: [36.8219, -1.2921],
    roles: ['AI Ethics Consultant'],
    timePeriod: '2024'
  },
  {
    id: 'india',
    name: 'India',
    coordinates: [78.9629, 20.5937],
    roles: ['ML Training Lead'],
    timePeriod: '2023'
  }
];

// Map configuration
export const mapConfig: Partial<MapProps> = {
  minZoom: 1,
  maxZoom: 20,
  dragRotate: true,
  projection: { name: 'globe' }
};

// Helper function to generate curved paths between points
export const generateCurvedPath = (start: [number, number], end: [number, number]): [number, number][] => {
  if (!start || !end) return [];
  
  const points: [number, number][] = [];
  const segments = 50;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Create an arc by interpolating between the points
    const lat = start[1] * (1 - t) + end[1] * t;
    const lng = start[0] * (1 - t) + end[0] * t;
    
    // Add some curvature by modifying the latitude
    const curveHeight = 0.2;
    const curve = Math.sin(t * Math.PI) * curveHeight;
    
    points.push([lng, lat + curve]);
  }

  return points;
};