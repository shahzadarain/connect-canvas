import React from 'react';
import { Card, CardContent } from "./ui/card";

const certificates = [
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    link: "#"
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    link: "#"
  },
  {
    title: "Azure DevOps Engineer",
    issuer: "Microsoft",
    date: "2023",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931",
    link: "#"
  },
  {
    title: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "2023",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    link: "#"
  },
];

const Certificates = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Continuous Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => (
            <a
              key={cert.title}
              href={cert.link}
              className="block hover:transform hover:scale-105 transition-transform duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;