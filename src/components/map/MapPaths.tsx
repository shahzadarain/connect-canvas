import mapboxgl from 'mapbox-gl';
import { type Location } from './types';
import { createCurvedLine } from './MapConfig';

export const addAnimatedPaths = (map: mapboxgl.Map, locations: Location[]) => {
  // Add primary location paths
  for (let i = 0; i < 5; i++) {
    if (i < 4) {
      const from = locations[i][1];
      const to = locations[i + 1][1];
      const points = createCurvedLine(from, to);
      
      map.addSource(`route-${i}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: points
          }
        }
      });

      // Add the path line
      map.addLayer({
        id: `route-${i}`,
        type: 'line',
        source: `route-${i}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#10B981',
          'line-width': 2,
          'line-opacity': 0.6,
          'line-dasharray': [2, 4]
        }
      });

      // Add animated particles layer
      map.addLayer({
        id: `particles-${i}`,
        type: 'symbol',
        source: `route-${i}`,
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 1,
          'icon-image': 'pulsing-dot',
          'icon-size': 0.4,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'symbol-sort-key': ['get', 'sort']
        }
      });
    }
  }

  // Add mission paths from Switzerland
  const switzerlandCoords = locations[3][1] as [number, number];
  locations.slice(5).forEach((location, i) => {
    const points = createCurvedLine(switzerlandCoords, location[1] as [number, number]);
    
    map.addSource(`mission-${i}`, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: points
        }
      }
    });

    // Add the path line
    map.addLayer({
      id: `mission-${i}`,
      type: 'line',
      source: `mission-${i}`,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#60A5FA',
        'line-width': 1.5,
        'line-opacity': 0.4,
        'line-dasharray': [2, 4]
      }
    });

    // Add animated particles layer
    map.addLayer({
      id: `mission-particles-${i}`,
      type: 'symbol',
      source: `mission-${i}`,
      layout: {
        'symbol-placement': 'line',
        'symbol-spacing': 1,
        'icon-image': 'pulsing-dot',
        'icon-size': 0.3,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'symbol-sort-key': ['get', 'sort']
      }
    });
  });
};

export const createPulsingDot = (map: mapboxgl.Map) => {
  const size = 120;
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    onAdd: function() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },
    render: function() {
      const duration = 1500;
      const t = (performance.now() % duration) / duration;
      
      const radius = (size / 2) * 0.2;
      const outerRadius = (size / 2) * 0.5 * t + radius;
      const context = this.context;
      
      context.clearRect(0, 0, this.width, this.height);
      
      // Outer glow
      const gradient = context.createRadialGradient(
        this.width / 2,
        this.height / 2,
        radius,
        this.width / 2,
        this.height / 2,
        outerRadius
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${1 - t})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.beginPath();
      context.arc(
        this.width / 2,
        this.height / 2,
        outerRadius,
        0,
        Math.PI * 2
      );
      context.fillStyle = gradient;
      context.fill();
      
      // Core dot
      context.beginPath();
      context.arc(
        this.width / 2,
        this.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      context.lineWidth = 2;
      context.fill();
      context.stroke();
      
      this.data = context.getImageData(0, 0, this.width, this.height).data;
      
      map.triggerRepaint();
      return true;
    }
  };
  
  map.addImage('pulsing-dot', pulsingDot as any, { pixelRatio: 2 });
};