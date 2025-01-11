import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Building2, Clock, Briefcase } from "lucide-react";
import { format } from "date-fns";

const UNJobs = () => {
  const { data: jobs, isLoading } = useQuery({
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>UN Jobs - Latest Opportunities at the United Nations</title>
        <meta
          name="description"
          content="Explore the latest job opportunities at the United Nations and its specialized agencies. Find positions in humanitarian aid, development, and more."
        />
        <meta
          name="keywords"
          content="UN jobs, United Nations careers, international development, humanitarian work, UN employment"
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-8 text-center">United Nations Jobs</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
        Discover career opportunities at the United Nations and its specialized
        agencies. Make a difference in international development, humanitarian
        aid, and global peace-building efforts.
      </p>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => (
            <Card key={job.id} className="p-6 flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4 flex-grow">
                {job.title}
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>{job.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>
                    Updated {format(new Date(job.update_time), "PPP")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Job ID: {job.job_id}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  className="w-full"
                  onClick={() => window.open(job.job_link, "_blank")}
                >
                  View Job <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UNJobs;