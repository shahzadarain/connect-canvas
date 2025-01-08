export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  roles?: string[];
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