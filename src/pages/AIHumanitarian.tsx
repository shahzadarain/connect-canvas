import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AIHumanitarian = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Link to="/">
          <Button variant="ghost" className="mb-8" aria-label="Back to Home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            AI Projects in the Humanitarian Sector: Transforming Lives Through Innovation
          </h1>

          <p className="lead">
            Artificial Intelligence (AI) is no longer just a buzzword in the tech world—it is a powerful 
            tool driving transformative change in the humanitarian sector. From predicting crises to 
            improving service delivery, AI is revolutionizing how organizations respond to emergencies 
            and support vulnerable communities.
          </p>

          <h2>1. AIMON: AI-Based Media Monitoring Tool</h2>
          <p>
            Developed by the CALP Network, AIMON is a cutting-edge tool that scans hundreds of thousands 
            of online news sources in real-time. Using Natural Language Processing (NLP) and Machine 
            Learning, it identifies reports of corruption related to vaccine procurement and delivery. 
            By enhancing transparency and accountability, AIMON ensures that humanitarian aid reaches 
            those who need it most.
          </p>

          <h2>2. Foresight Tool by the Danish Refugee Council</h2>
          <p>
            The Foresight Tool is a predictive analytics system designed to forecast forced displacement 
            in regions like Burkina Faso, Mali, Niger, and Nigeria. By leveraging open data from sources 
            such as UNHCR and the World Bank, this tool helps humanitarian organizations anticipate 
            migration patterns and prepare proactive responses, ultimately saving lives and resources.
          </p>

          <h2>3. International Rescue Committee (IRC) Initiatives</h2>
          <p>The IRC is harnessing AI for multiple groundbreaking projects:</p>
          <ul>
            <li>Optimizing service delivery to refugees, ensuring efficient allocation of resources.</li>
            <li>Predictive modeling of conflicts and crises to enable early intervention.</li>
            <li>Jobs-matching platforms for refugees, helping them find employment and rebuild their lives.</li>
            <li>Individualized learning experiences for children affected by crises, ensuring they receive quality education tailored to their needs.</li>
          </ul>

          <h2>4. Chatbot by the Norwegian Refugee Council</h2>
          <p>
            This AI-driven chatbot is a lifeline for Venezuelan migrants in Colombia. It provides 
            critical information about their rights under current immigration policies and laws, 
            empowering them with knowledge and facilitating access to essential legal services.
          </p>

          <h2>5. Project Jetson: UNHCR's Predictive Analytics Initiative</h2>
          <p>
            Project Jetson uses advanced predictive analytics to forecast forced displacement, enabling 
            humanitarian organizations to intervene before crises escalate. By analyzing trends and 
            patterns, this initiative helps prepare for and mitigate the impact of displacement on 
            vulnerable populations.
          </p>

          <h2>6. UNHCR Jordan: AI-Enhanced IVR System</h2>
          <p>
            The IVR AI project in Jordan is a game-changer for refugee support. Leveraging Optical 
            Character Recognition (OCR) and Natural Language Processing (NLP), this system automates 
            the transcription, categorization, and referral of voice and text inputs. By integrating 
            historical data, it provides actionable insights for decision-making, reducing response 
            times by 70%. This innovative approach enhances accessibility, inclusivity, and efficiency 
            in addressing refugee concerns.
          </p>

          <h2>7. MERON Tool: Diagnosing Malnutrition with AI</h2>
          <p>
            Developed by Kimetrica and UNICEF, the MERON (Methods for Extremely Rapid Observation of 
            Nutritional Status) tool uses facial recognition technology to remotely diagnose 
            malnutrition in children. This non-invasive, timely assessment ensures that vulnerable 
            populations receive the health interventions they need.
          </p>

          <h2>8. AI-Enhanced Disaster Mapping</h2>
          <p>
            In 2019, AI-supported disaster mapping played a crucial role in emergency response efforts 
            in Mozambique. By analyzing satellite imagery and other data sources, this technology 
            enabled quicker and more effective assistance to communities affected by natural disasters.
          </p>

          <h2>9. AI Training Programs for Humanitarian Workers</h2>
          <p>
            Recognizing the importance of AI literacy, various organizations are investing in upskilling 
            humanitarian workers. Collaborations between tech companies and educational institutions are 
            developing curricula that integrate AI training into humanitarian practices. These programs 
            ensure that professionals are equipped to leverage AI tools effectively in their work.
          </p>

          <h2>Conclusion: The Future of AI in Humanitarian Efforts</h2>
          <p>
            The projects highlighted above demonstrate the immense potential of AI to address some of 
            the world's most pressing humanitarian challenges. From predicting crises and optimizing 
            resource allocation to providing legal support and diagnosing malnutrition, AI is proving 
            to be a transformative force in the sector.
          </p>
          <p>
            As technology continues to evolve, its integration into humanitarian efforts will only 
            deepen, offering innovative solutions to complex problems. By combining the power of AI 
            with compassion and empathy, we can create a future where no one is left behind.
          </p>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg" role="complementary">
            <h3 className="text-xl font-semibold mb-4">Join the Movement</h3>
            <p className="mb-0">
              Together, we can harness the power of AI to build a more equitable and compassionate world.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AIHumanitarian;