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
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Projects in the Humanitarian Sector
            </h1>
            <p className="text-2xl text-muted-foreground font-serif italic">
              Transforming Lives Through Innovation
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-lg leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
              Artificial Intelligence (AI) is no longer just a buzzword in the tech world—it is a powerful 
              tool driving transformative change in the humanitarian sector. From predicting crises to 
              improving service delivery, AI is revolutionizing how organizations respond to emergencies 
              and support vulnerable communities.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* DAG Team Projects Section */}
            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-primary/10">
              <h2 className="text-3xl font-serif font-bold mb-6 text-primary">DAG Team Projects</h2>
              
              {/* Project 1: Aid Distribution Network */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-secondary">1. Aid Distribution Network Optimization</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Our DAG team has developed an innovative system that optimizes humanitarian aid distribution 
                  using directed acyclic graphs. This approach ensures:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg ml-4 mb-4">
                  <li>Efficient routing of aid supplies through complex networks</li>
                  <li>Real-time tracking of resources from source to beneficiary</li>
                  <li>Minimization of distribution bottlenecks</li>
                  <li>Transparent and auditable supply chains</li>
                </ul>
              </div>

              {/* Project 2: Smart Contract Integration */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-secondary">2. Smart Contract Integration</h3>
                <p className="text-lg leading-relaxed mb-4">
                  The team has implemented smart contracts within the DAG framework to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg ml-4 mb-4">
                  <li>Automate aid distribution based on predefined criteria</li>
                  <li>Ensure fair and transparent resource allocation</li>
                  <li>Create immutable records of all transactions</li>
                  <li>Enable real-time auditing and compliance monitoring</li>
                </ul>
              </div>

              {/* Project 3: Data Analytics Platform */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-secondary">3. Humanitarian Data Analytics Platform</h3>
                <p className="text-lg leading-relaxed mb-4">
                  A comprehensive analytics platform that leverages DAG structures to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg ml-4 mb-4">
                  <li>Analyze patterns in aid distribution and effectiveness</li>
                  <li>Predict future humanitarian needs using historical data</li>
                  <li>Generate insights for strategic decision-making</li>
                  <li>Monitor and evaluate program impact</li>
                </ul>
              </div>

              {/* Project 4: Collaboration Hub */}
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-secondary">4. Cross-Organization Collaboration Hub</h3>
                <p className="text-lg leading-relaxed mb-4">
                  A collaborative platform enabling multiple humanitarian organizations to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-lg ml-4">
                  <li>Share resources and information securely</li>
                  <li>Coordinate response efforts efficiently</li>
                  <li>Avoid duplication of aid delivery</li>
                  <li>Build a unified response to humanitarian crises</li>
                </ul>
              </div>
            </section>

            {/* Other Sections */}
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

            {/* Foresight Tool Section */}
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
          </div>
        </article>
      </main>
    </div>
  );
};

export default AIHumanitarian;
