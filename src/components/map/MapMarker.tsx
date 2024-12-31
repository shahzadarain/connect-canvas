import mapboxgl from 'mapbox-gl';
import { type Location } from './types';

export const createCustomMarker = (coordinates: [number, number]) => {
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.innerHTML = `
    <div class="w-4 h-4 bg-[#8B5CF6] rounded-full animate-pulse shadow-lg shadow-purple-500/50 
                ring-4 ring-purple-400/30 hover:ring-purple-400/50 transition-all duration-300">
    </div>
  `;
  return new mapboxgl.Marker(el);
};

export const addMarkersToMap = (map: mapboxgl.Map, locations: Location[]) => {
  locations.forEach(([name, coordinates]) => {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'custom-popup',
      offset: [0, -10]
    }).setHTML(`
      <div class="bg-[#1A1F2C]/90 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-xl border border-purple-500/20
                  transform transition-all duration-300 hover:scale-105">
        <h3 class="text-sm font-bold text-white">${name}</h3>
      </div>
    `);

    const marker = createCustomMarker(coordinates)
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);

    const markerEl = marker.getElement();
    markerEl.addEventListener('mouseenter', () => {
      popup.addTo(map);
      markerEl.classList.add('scale-125');
    });
    markerEl.addEventListener('mouseleave', () => {
      popup.remove();
      markerEl.classList.remove('scale-125');
    });
  });
};