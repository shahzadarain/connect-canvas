import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a valid session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        console.log('Checking auth status:', { hasSession: !!currentSession, error });
        
        if (error) {
          console.error('Auth error:', error);
          throw error;
        }

        if (!currentSession) {
          console.log('No valid session found, redirecting to login');
          // Clear any stale auth state
          await supabase.auth.signOut();
          navigate("/login");
          toast({
            title: "Session Expired",
            description: "Please log in again to continue.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Clear any corrupted auth state
        await supabase.auth.signOut();
        navigate("/login");
        toast({
          title: "Authentication Error",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
      }
    };

    checkAuth();
  }, [session, navigate, supabase.auth, toast]);

  // Show nothing while we check the auth status
  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;