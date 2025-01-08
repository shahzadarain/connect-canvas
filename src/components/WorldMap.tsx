import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type Location } from './map/types';

const locations: Location[] = [
  ["Pakistan", [69.3451, 30.3753], "Primary Work Location", 
    ["Data Manager (CIDA)", "Chief M&E Officer (Caritas Swiss)", "Data Supervisor (AKU Hospital)", "Information Management Officer (UNOCHA)"],
    ["Leading national health programs", "Designing M&E frameworks", "Coordinating humanitarian data"]
  ],
  ["South Sudan", [31.3070, 6.8770], "Primary Work Location",
    ["Information Management Specialist (UNICEF)"],
    ["Security assessments of data systems", "Gender-segregated reporting formats"]
  ],
  ["Kenya", [36.8219, -1.2921], "Primary Work Location",
    ["Regional Information Management Officer (UNICEF)"],
    ["Monitoring child protection programs", "Capacity building for partners"]
  ],
  ["Switzerland", [8.2275, 46.8182], "Primary Work Location",
    ["Emergency Information Management Officer (UNHCR HQ)"],
    ["Coordinated global missions", "Leading data collection and analysis"]
  ],
  ["Jordan", [35.9284, 31.9454], "Primary Work Location",
    ["Senior Information Management Officer", "Head of Data Analysis Group (DAG) (UNHCR)"],
    ["AI-based digital transformation", "Refugee resettlement analytics", "Cybersecurity advancements"]
  ],
  ["Uganda", [32.2903, 1.3733], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Technical assistance", "System implementation"]
  ],
  ["Sudan", [30.2176, 12.8628], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Data systems assessment", "Capacity building"]
  ],
  ["Malawi", [34.3015, -13.2543], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Technical consultation", "Systems integration"]
  ],
  ["Tanzania", [34.8888, -6.3690], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Data management support", "Training delivery"]
  ],
  ["Rwanda", [29.8739, -1.9403], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Systems assessment", "Technical implementation"]
  ],
  ["Syria", [38.9968, 34.8021], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Emergency response support", "Data systems setup"]
  ],
  ["Greece", [21.8243, 39.0742], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Technical assessment", "Systems optimization"]
  ],
  ["Ethiopia", [40.4897, 9.1450], "Mission Location",
    ["Mission Support - UNHCR"],
    ["Data management", "Capacity development"]
  ],
  ["Philippines", [121.7740, 12.8797], "Mission Location",
    ["Technical Advisor"],
    ["Systems implementation", "Training delivery"]
  ],
];

const WorldMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZWVyeCIsImEiOiJjbTR2dG10aGcwNnY2MmlzYml2bWV3MXQ1In0.i1afv65TWj9-t5r5mWOaEQ';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 1.8,
        projection: 'mercator',
      });

      const nav = new mapboxgl.NavigationControl({
        visualizePitch: true,
      });
      map.current.addControl(nav, 'top-right');

      // Add markers for each location
      locations.forEach(([name, coordinates, type, roles, contributions]) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.innerHTML = `
          <div class="w-4 h-4 ${type === 'Primary Work Location' ? 'bg-accent' : 'bg-secondary'} 
                      rounded-full animate-pulse shadow-lg 
                      ${type === 'Primary Work Location' ? 'shadow-accent/50' : 'shadow-secondary/50'} 
                      ring-4 ${type === 'Primary Work Location' ? 'ring-accent/30' : 'ring-secondary/30'}
                      hover:${type === 'Primary Work Location' ? 'ring-accent/50' : 'ring-secondary/50'} 
                      transition-all duration-300">
          </div>
        `;

        // Create popup
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'custom-popup',
          maxWidth: '300px',
          offset: [0, -10]
        }).setHTML(`
          <div class="bg-card/90 backdrop-blur-md p-4 rounded-lg shadow-xl 
                      border border-primary/20 transform transition-all duration-300">
            <h3 class="text-lg font-bold text-primary mb-2">${name}</h3>
            <p class="text-sm text-primary/80 mb-2">${type}</p>
            <div class="space-y-2">
              <div>
                <h4 class="text-sm font-semibold text-primary/90">Roles:</h4>
                <ul class="list-disc list-inside text-xs text-primary/80">
                  ${roles.map(role => `<li>${role}</li>`).join('')}
                </ul>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-primary/90">Key Contributions:</h4>
                <ul class="list-disc list-inside text-xs text-primary/80">
                  ${contributions.map(contribution => `<li>${contribution}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(coordinates as [number, number])
          .setPopup(popup)
          .addTo(map.current!);

        // Show popup on hover
        el.addEventListener('mouseenter', () => popup.addTo(map.current!));
        el.addEventListener('mouseleave', () => popup.remove());
      });

      // Add flight paths
      map.current.on('load', () => {
        // Add curved paths between primary locations
        for (let i = 0; i < 5; i++) {
          if (i < 4) {
            const from = locations[i][1];
            const to = locations[i + 1][1];
            
            // Create a curved path
            const points = createCurvedLine(from, to);
            
            map.current!.addSource(`route-${i}`, {
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

            map.current!.addLayer({
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
                'line-dasharray': [0, 4, 3]
              }
            });
          }
        }

        // Add mission paths from Switzerland
        const switzerlandCoords = locations[3][1];
        locations.slice(5).forEach((location, i) => {
          const points = createCurvedLine(switzerlandCoords, location[1]);
          
          map.current!.addSource(`mission-${i}`, {
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

          map.current!.addLayer({
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
              'line-dasharray': [0, 4, 3]
            }
          });
        });
      });

      console.log('Map initialized with location markers and flight paths');
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Helper function to create curved lines between two points
  function createCurvedLine(start: [number, number], end: [number, number]) {
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      
      // Create an arc by adding a midpoint that's elevated
      const mid = [
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t
      ];
      
      // Add some curvature by moving the point perpendicular to the direct path
      const curveStrength = 0.2;
      const midHeight = Math.sin(t * Math.PI) * curveStrength;
      
      points.push([
        mid[0],
        mid[1] + midHeight
      ]);
    }
    
    return points;
  }

  return (
    <section id="journey" className="py-24 bg-gradient-to-b from-[#2C3E50] via-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="container mx-auto px-4 relative">
        <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
};

export default WorldMap;