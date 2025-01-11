import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Globe,
  Briefcase,
  Building,
  Calendar,
  Search,
  Flag,
} from "lucide-react";
import { useState } from "react";

const UNJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["un-jobs", searchTerm],
    queryFn: async () => {
      console.log("Fetching UN jobs with search term:", searchTerm);
      let query = supabase
        .from("un_jobs")
        .select("*")
        .order("update_time", { ascending: false });

      if (searchTerm) {
        query = query.or(
          `title.ilike.%${searchTerm}%,organization.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>United Nations Jobs | Find Your Next UN Career Opportunity</title>
        <meta
          name="description"
          content="Browse the latest United Nations job opportunities. Find positions across UN agencies and make a global impact with your career."
        />
        <meta
          name="keywords"
          content="UN jobs, United Nations careers, international development, humanitarian work, UN agencies"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              United Nations Jobs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Make a difference globally. Find your next career opportunity within
              the United Nations system.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search jobs by title or organization..."
                className="pl-10 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"
                >
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))
            ) : jobs?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No jobs found matching your search criteria.
                </p>
              </div>
            ) : (
              jobs?.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-start">
                    <Briefcase className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-blue-500" />
                    <a
                      href={job.job_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 transition-colors"
                    >
                      {job.title}
                    </a>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{job.organization}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Updated: {formatDate(job.update_time)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="hover:bg-blue-50 dark:hover:bg-gray-700"
                      onClick={() => window.open(job.job_link, "_blank")}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UNJobs;