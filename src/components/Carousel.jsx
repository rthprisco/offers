import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/slides/banner-principal.png',
    '/slides/slide-01.jpg',
    '/slides/slide-02.jpg',
    '/slides/slide-03.jpg',
    '/slides/slide-04.webp',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-full sm:max-w-[1200px] mx-auto relative group">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1200/340] overflow-hidden rounded-lg">
        <img
          src={slides[currentSlide] || "/placeholder.svg"}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 items-center justify-center w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-red-600 w-8' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
