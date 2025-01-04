import React from 'react';
import { BookOpen } from 'lucide-react';

const books = [
  {
    title: "HBR's 10 Must Reads on Innovation",
    author: "Harvard Business Review",
    cover: "/placeholder.svg",
    type: "audio",
    link: "https://drive.google.com/file/d/10sykJXuo3_hlZ1Qd8RulT57o7ky_q-RC/view?usp=drivesdk",
    alt: "Book cover of HBR's 10 Must Reads on Innovation"
  },
  {
    title: "Humor, Seriously",
    author: "Jennifer Aaker & Naomi Bagdonas",
    cover: "/lovable-uploads/bdd53de1-ec83-441e-aece-00a17a8ed612.png",
    alt: "Book cover of Humor, Seriously by Jennifer Aaker & Naomi Bagdonas",
    link: "https://www.humorseriously.com/"
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/lovable-uploads/2cbb00e0-5635-4e8e-8ff7-35464601d395.png",
    alt: "Book cover of Designing Data-Intensive Applications by Martin Kleppmann",
    link: "https://dataintensive.net/"
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    cover: "/lovable-uploads/f9897ed6-0eb1-46ac-a75c-71229f7179b1.png",
    alt: "Book cover of The Innovator's Dilemma by Clayton M. Christensen",
    link: "https://www.amazon.com/Innovators-Dilemma-Technologies-Management-Innovation/dp/1633691780"
  }
];

const ReadingList = () => {
  return (
    <section id="reading" className="py-24 bg-gradient-to-b from-background via-background/80 to-[#F2FCE2] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Current Reading List
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <a
              key={book.title}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl mb-2 text-white">{book.title}</h3>
                    <p className="text-gray-200 text-sm">{book.author}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Read More
              </div>
              {book.type === 'audio' && (
                <div className="absolute top-4 left-4 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Audio
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadingList;