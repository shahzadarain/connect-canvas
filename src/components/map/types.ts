import type { Feature, LineString, Point } from 'geojson';

export interface Location {
  coordinates: [number, number];
  name: string;
  role?: string;
  organization?: string;
  timePeriod?: string;
  contributions?: string[];
}

export interface RouteFeature extends Feature<LineString> {
  properties: {
    name: string;
    type: 'work' | 'mission';
  };
}

export interface MarkerFeature extends Feature<Point> {
  properties: {
    name: string;
    type: 'work' | 'mission';
    role?: string;
    organization?: string;
    timePeriod?: string;
    contributions?: string[];
  };
}