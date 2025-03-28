import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig, workLocations, missionLocations } from './map/MapConfig';
import MapMarkers from './map/MapMarkers';
import MapPaths from './map/MapPaths';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const WorldMap = () => {
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        console.log('Fetching Mapbox token from Supabase...');
        const { data, error } = await supabase.functions.invoke('get-mapbox-token', {
          method: 'POST'
        });
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          toast({
            title: "Error",
            description: "Failed to load map configuration. Please try again later.",
            variant: "destructive"
          });
          return;
        }

        if (data?.token) {
          console.log('Successfully retrieved Mapbox token');
          setMapboxToken(data.token);
        } else {
          console.error('No token received from Edge Function');
          toast({
            title: "Configuration Error",
            description: "Map token not found. Please check the configuration.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error in fetchMapboxToken:', error);
        toast({
          title: "Error",
          description: "Failed to initialize map. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapboxToken();
  }, [toast]);

  const markers = useMemo(() => {
    return [
      ...workLocations.map(location => ({ location, type: 'work' as const })),
      ...missionLocations.map(location => ({ location, type: 'mission' as const })),
    ];
  }, []);

  const paths = useMemo(() => {
    const switzerlandCoords = workLocations.find(loc => loc.id === 'switzerland')?.coordinates;
    if (!switzerlandCoords) return [];

    return [
      // Work location paths (chronological)
      ...workLocations.slice(0, -1).map((loc, index) => ({
        start: loc.coordinates,
        end: workLocations[index + 1].coordinates,
        type: 'work' as const,
      })),
      // Mission paths from Switzerland
      ...missionLocations.map(loc => ({
        start: switzerlandCoords,
        end: loc.coordinates,
        type: 'mission' as const,
      })),
    ];
  }, []);

  const onMapLoad = useCallback(() => {
    console.log('Map loaded successfully');
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Unable to load map configuration. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative">
      <Map
        mapboxAccessToken={mapboxToken}
        onLoad={onMapLoad}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        initialViewState={{
          longitude: 0,
          latitude: 20,
          zoom: 1.5,
          pitch: 0,
          bearing: 0,
        }}
        projection={{ name: 'globe' as const }}
      >
        <NavigationControl position="top-right" />
        <MapPaths paths={paths} />
        <MapMarkers markers={markers} />
      </Map>
    </div>
  );
};

export default WorldMap;