
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export const VisitorTracker = () => {
  const location = useLocation();
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const { error } = await supabase.functions.invoke('track-visitor', {
          body: {
            pathname: location.pathname,
            referrer: document.referrer,
            userId: session?.user?.id
          }
        });

        if (error) {
          console.error('Error tracking visit:', error);
        }
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [location.pathname, session?.user?.id]);

  return null;
};
