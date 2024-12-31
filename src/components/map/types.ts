export type Location = [string, [number, number], string];

export type MapConfig = {
  container: HTMLDivElement;
  style: string;
  center: [number, number];
  zoom: number;
  projection: string;
};

// Add the missing RouteFeature type
export type RouteFeature = {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
};