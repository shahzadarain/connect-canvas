import React from 'react';

const books = [
  {
    title: "Humor, Seriously",
    author: "Jennifer Aaker & Naomi Bagdonas",
    cover: "/lovable-uploads/bdd53de1-ec83-441e-aece-00a17a8ed612.png",
    link: "https://www.humorseriously.com/"
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "/lovable-uploads/2cbb00e0-5635-4e8e-8ff7-35464601d395.png",
    link: "https://dataintensive.net/"
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    cover: "/lovable-uploads/f9897ed6-0eb1-46ac-a75c-71229f7179b1.png",
    link: "https://www.amazon.com/Innovators-Dilemma-Technologies-Management-Innovation/dp/1633691780"
  },
  {
    title: "Disciplined Dreaming",
    author: "Josh Linkner",
    cover: "/lovable-uploads/4c89cf12-c2f3-4952-afe6-1c742e2404d8.png",
    link: "https://joshlinkner.com/books/"
  }
];

const ReadingList = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Current Reading List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <a
              key={book.title}
              href={book.link}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl mb-2">{book.title}</h3>
                    <p className="text-gray-200 text-sm">{book.author}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadingList;