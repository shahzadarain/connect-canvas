import { type Location } from './types';
import { type ProjectionSpecification } from 'mapbox-gl';

export const locations: Location[] = [
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

export const mapConfig = {
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [0, 20],
  zoom: 1.8,
  projection: {
    name: 'mercator'
  } as ProjectionSpecification
};

export const createCurvedLine = (start: [number, number], end: [number, number]) => {
  const points = [];
  const steps = 50;
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mid = [
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t
    ];
    const curveStrength = 0.2;
    const midHeight = Math.sin(t * Math.PI) * curveStrength;
    points.push([mid[0], mid[1] + midHeight]);
  }
  return points;
};