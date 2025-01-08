import mapboxgl from 'mapbox-gl';
import { type Location } from './types';

export const addMarkers = (map: mapboxgl.Map, locations: Location[]) => {
  locations.forEach(([name, coordinates, type, roles, contributions]) => {
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

    new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);

    el.addEventListener('mouseenter', () => popup.addTo(map));
    el.addEventListener('mouseleave', () => popup.remove());
  });
};