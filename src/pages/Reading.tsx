import React from "react";
import Navigation from "@/components/Navigation";
import ReadingList from "@/components/ReadingList";
import Footer from "@/components/Footer";

const Reading = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <ReadingList />
      </div>
      <Footer />
    </div>
  );
};

export default Reading;