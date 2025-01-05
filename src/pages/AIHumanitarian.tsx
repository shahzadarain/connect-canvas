import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIHumanitarian = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/50">
      <main className="container mx-auto px-4 py-24">
        <Link to="/">
          <Button variant="ghost" className="mb-8" aria-label="Back to Home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <article className="max-w-4xl mx-auto">
          {/* Hero Section with improved visibility */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
              AI Projects in the Humanitarian Sector
            </h1>
            <p className="text-2xl text-primary font-serif italic">
              Transforming Lives Through Innovation
            </p>
          </div>

          {/* Introduction with improved readability */}
          <div className="mb-12 bg-[#F1F0FB] dark:bg-gray-800/50 p-8 rounded-xl shadow-lg">
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
              Artificial Intelligence (AI) is no longer just a buzzword in the tech world—it is a powerful 
              tool driving transformative change in the humanitarian sector. From predicting crises to 
              improving service delivery, AI is revolutionizing how organizations respond to emergencies 
              and support vulnerable communities.
            </p>
          </div>

          {/* DAG Projects Section with improved contrast */}
          <section className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-primary/10 mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6 text-[#8B5CF6] dark:text-[#D946EF]">DAG Projects</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-[#0EA5E9] dark:text-[#60A5FA]">Project Athena</h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-800 dark:text-gray-200">
                  A machine learning system that analyzes satellite imagery to identify areas affected by natural disasters. 
                  This helps humanitarian organizations prioritize their response efforts and allocate resources more effectively.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-[#0EA5E9] dark:text-[#60A5FA]">Project Hermes</h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-800 dark:text-gray-200">
                  A natural language processing tool that translates emergency communications in real-time across multiple languages, 
                  enabling faster and more effective communication during crisis situations.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-[#0EA5E9] dark:text-[#60A5FA]">Project Demeter</h3>
                <p className="text-lg leading-relaxed mb-4 text-gray-800 dark:text-gray-200">
                  An AI-powered agricultural monitoring system that predicts crop yields and potential food shortages, 
                  helping organizations prepare for and prevent humanitarian crises before they occur.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-3 text-[#0EA5E9] dark:text-[#60A5FA]">Project Iris</h3>
                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                  A computer vision system that assists in medical diagnosis in remote areas with limited access to healthcare professionals, 
                  focusing particularly on infectious diseases and malnutrition.
                </p>
              </div>
            </div>
          </section>

          {/* Other sections with consistent styling */}
          <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-serif font-bold mb-4 text-primary">1. AIMON: AI-Based Media Monitoring Tool</h2>
            <p className="text-lg leading-relaxed">
              Developed by the CALP Network, AIMON is a cutting-edge tool that scans hundreds of thousands 
              of online news sources in real-time. Using Natural Language Processing (NLP) and Machine 
              Learning, it identifies reports of corruption related to vaccine procurement and delivery. 
              By enhancing transparency and accountability, AIMON ensures that humanitarian aid reaches 
              those who need it most.
            </p>
          </section>

            <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">2. Foresight Tool by the Danish Refugee Council</h2>
              <p className="text-lg leading-relaxed">
                The Foresight Tool is a predictive analytics system designed to forecast forced displacement 
                in regions like Burkina Faso, Mali, Niger, and Nigeria. By leveraging open data from sources 
                such as UNHCR and the World Bank, this tool helps humanitarian organizations anticipate 
                migration patterns and prepare proactive responses, ultimately saving lives and resources.
              </p>
            </section>

            {/* IRC Initiatives Section */}
            <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">3. International Rescue Committee (IRC) Initiatives</h2>
              <p className="text-lg mb-4">The IRC is harnessing AI for multiple groundbreaking projects:</p>
              <ul className="list-disc list-inside space-y-2 text-lg ml-4">
                <li>Optimizing service delivery to refugees, ensuring efficient allocation of resources.</li>
                <li>Predictive modeling of conflicts and crises to enable early intervention.</li>
                <li>Jobs-matching platforms for refugees, helping them find employment and rebuild their lives.</li>
                <li>Individualized learning experiences for children affected by crises.</li>
              </ul>
            </section>

            {/* Continue with other sections using the same pattern */}
            <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">4. Chatbot by the Norwegian Refugee Council</h2>
              <p className="text-lg leading-relaxed">
                This AI-driven chatbot is a lifeline for Venezuelan migrants in Colombia. It provides 
                critical information about their rights under current immigration policies and laws, 
                empowering them with knowledge and facilitating access to essential legal services.
              </p>
            </section>

            <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">5. Project Jetson: UNHCR's Predictive Analytics Initiative</h2>
              <p className="text-lg leading-relaxed">
                Project Jetson uses advanced predictive analytics to forecast forced displacement, enabling 
                humanitarian organizations to intervene before crises escalate. By analyzing trends and 
                patterns, this initiative helps prepare for and mitigate the impact of displacement on 
                vulnerable populations.
              </p>
            </section>

            {/* Conclusion Section */}
            <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">Conclusion: The Future of AI in Humanitarian Efforts</h2>
              <p className="text-lg leading-relaxed mb-4">
                The projects highlighted above demonstrate the immense potential of AI to address some of 
                the world's most pressing humanitarian challenges. From predicting crises and optimizing 
                resource allocation to providing legal support and diagnosing malnutrition, AI is proving 
                to be a transformative force in the sector.
              </p>
              <p className="text-lg leading-relaxed">
                As technology continues to evolve, its integration into humanitarian efforts will only 
                deepen, offering innovative solutions to complex problems. By combining the power of AI 
                with compassion and empathy, we can create a future where no one is left behind.
              </p>
            </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-8 shadow-lg text-center">
            <h3 className="text-2xl font-serif font-bold mb-4">Join the Movement</h3>
            <p className="text-lg mb-6">
              Together, we can harness the power of AI to build a more equitable and compassionate world.
            </p>
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Learn More
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </article>
      </main>
    </div>
  );
};

export default AIHumanitarian;
