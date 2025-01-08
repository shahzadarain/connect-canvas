import type { Feature, LineString, Point } from 'geojson';

export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  roles?: string[];
  timePeriod?: string;
  contributions?: string[];
}

export interface Location {
  coordinates: [number, number];
  name: string;
  role?: string;
  organization?: string;
  timePeriod?: string;
  contributions?: string[];
}

export interface MapMarkerProps {
  location: MapLocation;
  type: 'work' | 'mission';
}

export interface MapPathProps {
  start: [number, number];
  end: [number, number];
  type: 'work' | 'mission';
}

export interface RouteFeature extends Feature<LineString> {
  properties: {
    name?: string;
    type?: 'work' | 'mission';
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