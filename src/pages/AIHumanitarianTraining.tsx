import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AIHumanitarianTraining = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/50">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Link to="/">
          <Button variant="ghost" className="mb-8" aria-label="Back to Home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16 text-center not-prose">
            <h1 className="text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              How AI is Transforming Humanitarian Training: Leveraging WhatsApp and AI
            </h1>
            <p className="text-2xl text-muted-foreground font-serif italic">
              Innovating Training Methods in Resource-Scarce Environments
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left">
              As a veteran of the humanitarian sector with 15 years of experience spanning over 15 countries, 
              I've consistently sought innovative solutions to the complex challenges we face. Recently, one 
              of the most promising developments has been the transformative impact of Artificial Intelligence (AI) 
              on humanitarian training, particularly when combined with accessible communication platforms like WhatsApp.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">1. Personalized Learning Paths with AI Chatbots</h2>
              <p>
                AI-driven chatbots on WhatsApp can function as sophisticated virtual trainers, delivering 
                customized, bite-sized lessons tailored to individual needs and learning styles. For instance, 
                a chatbot can utilize Natural Language Processing (NLP) to assess a worker's current knowledge, 
                identify specific learning gaps, and then provide targeted resources, such as instructional videos, 
                interactive quizzes, or relevant case studies.
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg mt-4">
                <p className="text-sm italic">
                  Reference: A study by the World Bank highlighted the effectiveness of personalized learning 
                  in improving educational outcomes, particularly in resource-constrained settings. (World Bank, 2018)
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">2. Real-Time Support and Feedback</h2>
              <p>
                Humanitarian work is inherently unpredictable, often requiring rapid decision-making in 
                high-stress situations. AI chatbots can provide invaluable real-time guidance, answering 
                questions, offering step-by-step instructions, and providing access to critical information 
                during emergencies.
              </p>
              <div className="bg-secondary/10 p-4 rounded-lg mt-4">
                <p className="text-sm italic">
                  Reference: The use of chatbots for real-time support in emergency response is being explored 
                  by organizations like the International Rescue Committee (IRC).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">3. Gamification for Enhanced Engagement</h2>
              <p>
                AI can be employed to gamify the training process, creating engaging interactive scenarios 
                and realistic simulations that promote active learning. Workers can participate in role-playing 
                exercises, simulating their roles as responders in various crisis scenarios, making decisions, 
                and receiving immediate feedback on their performance.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">4. Language Accessibility</h2>
              <p>
                AI-powered translation tools, seamlessly integrated with WhatsApp, can effectively overcome 
                language barriers, making training accessible to diverse, multilingual teams. A worker in 
                Nigeria can receive training materials in Hausa, while a colleague in Bangladesh receives 
                the same content translated into Bengali.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">5. Data-Driven Insights</h2>
              <p>
                AI excels at analyzing large datasets to identify patterns, trends, and areas for improvement. 
                In the context of training, AI can analyze data on worker performance, engagement, and knowledge 
                retention to identify areas where the curriculum may need adjustments.
              </p>
            </section>

            {/* Technical Flow Section */}
            <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">Technical Implementation Flow</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>User Interaction: Initial contact through WhatsApp</li>
                <li>Assessment & Profiling: NLP-based dialogue for needs assessment</li>
                <li>Content Curation & Delivery: Personalized content distribution</li>
                <li>Real-Time Support: Immediate assistance and guidance</li>
                <li>Feedback Loop: Continuous improvement through user feedback</li>
                <li>Data Analysis: Performance metrics and program optimization</li>
                <li>System Integration: Connection with existing LMS and HRIS</li>
              </ul>
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-4 text-primary">Conclusion</h2>
              <p>
                By strategically leveraging the power of AI in conjunction with the ubiquity and accessibility 
                of WhatsApp, humanitarian organizations can create scalable, impactful, and adaptable training 
                programs. These programs empower frontline workers with the knowledge and skills necessary to 
                respond effectively to crises and, ultimately, to save lives more efficiently.
              </p>
            </section>

            {/* Author Profile */}
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-8 shadow-lg text-center mt-12">
              <h3 className="text-2xl font-serif font-bold mb-4">About the Author</h3>
              <p className="text-lg mb-6">
                Connect with me to learn more about AI innovations in humanitarian aid.
              </p>
              <a 
                href="https://www.linkedin.com/in/shahzadasghar1/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Connect on LinkedIn
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AIHumanitarianTraining;