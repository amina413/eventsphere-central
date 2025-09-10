import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import heroTech from "@/assets/hero-tech.jpg";
import heroCultural from "@/assets/hero-cultural.jpg";
import heroAcademic from "@/assets/hero-academic.jpg";

const heroImages = [
  {
    src: heroTech,
    alt: "Technical Events",
    title: "Technical Excellence",
    subtitle: "Code, Create, Compete"
  },
  {
    src: heroCultural,
    alt: "Cultural Events", 
    title: "Cultural Celebrations",
    subtitle: "Express, Perform, Celebrate"
  },
  {
    src: heroAcademic,
    alt: "Academic Events",
    title: "Academic Achievement", 
    subtitle: "Learn, Research, Excel"
  }
];

export const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-accent/40" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevImage}
        className="absolute left-6 z-20 bg-white/10 hover:bg-white/20 text-white border-white/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextImage}
        className="absolute right-6 z-20 bg-white/10 hover:bg-white/20 text-white border-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-6 opacity-80">
          <p className="text-accent-light text-lg font-medium">
            {heroImages[currentImage].subtitle}
          </p>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover, Register,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-accent">
            Participate
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Join thousands of students in technical competitions, cultural celebrations, 
          and academic conferences. Your next great experience awaits.
        </p>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="text-lg px-8 py-4 shadow-glow animate-pulse hover:animate-none"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "bg-accent scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};