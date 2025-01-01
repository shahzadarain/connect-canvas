import React from 'react';
import { Card, CardContent } from "./ui/card";

const certificates = [
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "AWS Solutions Architect Certification Badge",
    link: "#"
  },
  {
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Google Cloud Professional Certification Badge",
    link: "#"
  },
  {
    title: "Azure DevOps Engineer",
    issuer: "Microsoft",
    date: "2023",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    alt: "Microsoft Azure DevOps Engineer Certification Badge",
    link: "#"
  },
  {
    title: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "2023",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    alt: "EC-Council Certified Ethical Hacker Certification Badge",
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
                      alt={cert.alt}
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