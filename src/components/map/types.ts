export type Location = [string, [number, number], string];

export type MapConfig = {
  container: HTMLDivElement;
  style: string;
  center: [number, number];
  zoom: number;
  projection: string;
};