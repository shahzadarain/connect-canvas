import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-gradient-to-b from-transparent to-[#1A1F2C]/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-blue-200/70 font-medium">
          Developed by Shahzad with ReactJS and{' '}
          <span className="text-red-500 animate-pulse">❤️</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;