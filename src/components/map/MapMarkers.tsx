import React from 'react';
import { Marker } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapMarkerProps } from './types';

const MapMarkers: React.FC<{ markers: MapMarkerProps[] }> = ({ markers }) => {
  return (
    <>
      {markers.map(({ location, type }) => (
        <Marker
          key={location.id}
          longitude={location.coordinates[0]}
          latitude={location.coordinates[1]}
          anchor="bottom"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MapPin
                  className={`h-6 w-6 ${
                    type === 'work' ? 'text-green-500' : 'text-blue-500'
                  } hover:scale-110 transition-transform cursor-pointer`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                  {location.roles && (
                    <div className="mb-2">
                      <p className="font-semibold">Roles:</p>
                      <ul className="list-disc list-inside">
                        {location.roles.map((role, index) => (
                          <li key={index} className="text-sm">{role}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {location.timePeriod && (
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Period:</span> {location.timePeriod}
                    </p>
                  )}
                  {location.contributions && (
                    <div>
                      <p className="font-semibold">Key Contributions:</p>
                      <ul className="list-disc list-inside">
                        {location.contributions.map((contribution, index) => (
                          <li key={index} className="text-sm">{contribution}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Marker>
      ))}
    </>
  );
};

export default MapMarkers;