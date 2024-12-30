import React from 'react';

const books = [
  {
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    link: "#"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
    link: "#"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
    link: "#"
  },
  {
    title: "The Phoenix Project",
    author: "Gene Kim",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    link: "#"
  },
];

const ReadingList = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
          Current Reading List
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {books.map((book) => (
            <a
              key={book.title}
              href={book.link}
              className="group relative aspect-[2/3] overflow-hidden rounded-xl"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-300">{book.author}</p>
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