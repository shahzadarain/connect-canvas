import { type Feature, type Geometry } from 'geojson';

export type Location = [string, [number, number]];

export type RouteFeature = Feature<Geometry, { [name: string]: any }>;

export type MapConfig = {
  container: HTMLDivElement;
  style: string;
  center: [number, number];
  zoom: number;
  projection: string;
  pitch: number;
};