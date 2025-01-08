export type Location = [string, [number, number], string, string[], string[]];

export type RouteFeature = {
  type: 'Feature';
  properties: Record<string, any>;
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
};

export type LocationData = {
  name: string;
  coordinates: [number, number];
  roles: string[];
  contributions: string[];
  organization: string;
};