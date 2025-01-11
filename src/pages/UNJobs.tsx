import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Briefcase, ExternalLink, RefreshCw, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const UNJobs = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const { data: jobs, isLoading, error, refetch } = useQuery({
    queryKey: ["un-jobs"],
    queryFn: async () => {
      console.log('Fetching UN jobs from database...');
      const { data, error } = await supabase
        .from("un_jobs")
        .select("*")
        .order("update_time", { ascending: false })
        .limit(100); // Increased limit to fetch more jobs

      if (error) {
        console.error('Error fetching UN jobs:', error);
        throw error;
      }
      
      console.log('Fetched jobs:', data?.length || 0, 'jobs found');
      return data;
    },
  });

  const updateJobs = async () => {
    try {
      setIsUpdating(true);
      console.log('Invoking fetch-un-jobs function...');
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
        <Alert variant="destructive">
          <AlertDescription>
            Error loading jobs. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-4">
            <Briefcase className="inline-block mr-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
            UN Job Opportunities
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore the latest job opportunities at the United Nations. Updated regularly with new positions from various UN organizations worldwide.
          </p>
          {jobs && (
            <Badge variant="secondary" className="text-lg">
              {jobs.length} Available Positions
            </Badge>
          )}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700 group hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      {job.organization}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <time className="text-sm">
                      {format(new Date(job.update_time), "MMM d, yyyy")}
                    </time>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {job.title}
                </h2>
                <a
                  href={job.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 group-hover:underline"
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertDescription>
              No jobs available at the moment. Click the Update Jobs button to fetch the latest opportunities.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-12 text-center">
          <Button
            onClick={updateJobs}
            disabled={isUpdating}
            size="lg"
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105 mx-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <RefreshCw className={`w-5 h-5 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating Jobs...' : 'Update Jobs'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UNJobs;