import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Briefcase, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

const UNJobs = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const session = useSession();
  const { toast } = useToast();

  const { data: jobs, isLoading, error, refetch } = useQuery({
    queryKey: ["un-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("un_jobs")
        .select("*")
        .order("update_time", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: userRole } = useQuery({
    queryKey: ["user-role", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session?.user?.id)
        .single();
      
      if (error) throw error;
      return data?.role;
    },
  });

  const updateJobs = async () => {
    try {
      setIsUpdating(true);
      const { error } = await supabase.functions.invoke('fetch-un-jobs', {
        method: 'POST',
      });

      if (error) throw error;

      await refetch();
      toast({
        title: "Success",
        description: "UN jobs have been updated successfully",
        className: "bg-white dark:bg-gray-800",
      });
    } catch (error) {
      console.error('Error updating UN jobs:', error);
      toast({
        title: "Error",
        description: "Failed to update UN jobs. Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    console.error("Error fetching jobs:", error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading jobs. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
            <Briefcase className="inline-block mr-4 h-12 w-12" />
            UN Job Opportunities
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Explore the latest job opportunities at the United Nations
          </p>
          {userRole === 'admin' && (
            <Button
              onClick={updateJobs}
              disabled={isUpdating}
              className="flex items-center gap-2 transition-transform hover:scale-105 mx-auto"
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
              {isUpdating ? 'Updating Jobs...' : 'Update Jobs'}
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg shadow-md p-6"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs?.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-blue-600">
                    {job.organization}
                  </span>
                  <time className="text-sm text-gray-500">
                    {format(new Date(job.update_time), "MMM d, yyyy")}
                  </time>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {job.title}
                </h2>
                <a
                  href={job.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UNJobs;