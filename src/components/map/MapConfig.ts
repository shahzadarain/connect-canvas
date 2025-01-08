import { ProjectionSpecification } from 'mapbox-gl';
import { MapLocation } from './types';

export const mapConfig = {
  style: 'mapbox://styles/mapbox/dark-v11',
  projection: { name: 'mercator' } as ProjectionSpecification,
  initialViewState: {
    longitude: 20,
    latitude: 20,
    zoom: 1.5,
    bearing: 0,
    pitch: 30,
  },
  mapStyle: {
    version: 8,
    sources: {},
    layers: [],
  },
};

export const workLocations: MapLocation[] = [
  {
    id: 'pakistan',
    name: 'Pakistan',
    coordinates: [69.3451, 30.3753],
    roles: [
      'Data Manager (CIDA)',
      'Chief Monitoring & Evaluation Officer (Caritas Swiss)',
      'Data Supervisor (Aga Khan University Hospital)',
      'Information Management Officer (UNOCHA)',
    ],
    timePeriod: '2002–2012',
    contributions: ['National health programs', 'M&E frameworks', 'humanitarian data coordination'],
  },
  {
    id: 'south-sudan',
    name: 'South Sudan',
    coordinates: [31.3070, 6.8770],
    roles: ['Information Management Specialist (UNICEF)'],
    timePeriod: '2012–2014',
    contributions: ['Data security assessments', 'gender-segregated reporting'],
  },
  {
    id: 'kenya',
    name: 'Kenya',
    coordinates: [36.8219, -1.2921],
    roles: ['Regional Information Management Officer (UNICEF)'],
    timePeriod: '2014–2015',
    contributions: ['Child protection data management', 'capacity building'],
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    coordinates: [8.2275, 46.8182],
    roles: ['Emergency Information Management Officer (UNHCR HQ)'],
    timePeriod: '2015–2018',
    contributions: ['Coordinated global missions', 'advanced data analytics for emergency operations'],
  },
  {
    id: 'jordan',
    name: 'Jordan',
    coordinates: [35.9284, 31.9454],
    roles: ['Senior Information Management Officer', 'Head of Data Analysis Group (DAG) (UNHCR)'],
    timePeriod: '2018–Present',
    contributions: [
      'AI-driven transformation projects',
      'refugee resettlement systems',
      'cybersecurity initiatives',
    ],
  },
];

export const missionLocations: MapLocation[] = [
  { id: 'uganda', name: 'Uganda', coordinates: [32.2903, 1.3733] },
  { id: 'sudan', name: 'Sudan', coordinates: [30.2176, 12.8628] },
  { id: 'malawi', name: 'Malawi', coordinates: [34.3015, -13.2543] },
  { id: 'tanzania', name: 'Tanzania', coordinates: [34.8888, -6.3690] },
  { id: 'kenya-mission', name: 'Kenya', coordinates: [36.8219, -1.2921] },
  { id: 'rwanda', name: 'Rwanda', coordinates: [29.8739, -1.9403] },
  { id: 'syria', name: 'Syria', coordinates: [38.9968, 34.8021] },
  { id: 'greece', name: 'Greece', coordinates: [21.8243, 39.0742] },
  { id: 'ethiopia', name: 'Ethiopia', coordinates: [40.4897, 9.1450] },
];

export const generateCurvedPath = (start: [number, number], end: [number, number]): [number, number][] => {
  const points: [number, number][] = [];
  const steps = 50;
  
  // Calculate midpoint
  const mid: [number, number] = [
    start[0] + (end[0] - start[0]) / 2,
    start[1] + (end[1] - start[1]) / 2,
  ];
  
  // Calculate distance for curve height
  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
  );
  const midHeight = distance * 0.2;
  
  // Generate curved path points
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const point = [
      start[0] * Math.pow(1 - t, 2) + mid[0] * 2 * (1 - t) * t + end[0] * Math.pow(t, 2),
      start[1] * Math.pow(1 - t, 2) + (mid[1] + midHeight) * 2 * (1 - t) * t + end[1] * Math.pow(t, 2),
    ] as [number, number];
    points.push(point);
  }
  
  return points;
};