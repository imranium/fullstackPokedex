import React from "react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export const Carousel = () => {
  const images = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/29089597/pexels-photo-29089597/free-photo-of-stunning-autumn-beach-sunset-with-waves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousClick = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextClick = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNextClick]);

  return (
    <div className="relative w-full h-full bg-gray-300 flex items-center justify-center overflow-hidden group">

      {/* Left Button */}
      <button
        className="absolute left-4 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-opacity opacity-0 group-hover:opacity-100"
        onClick={handlePreviousClick}
      >
        &lt;
      </button>

      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.url}
              alt={`Carousel image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Left Button */}
      <button
        className="absolute right-4 z-10 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-opacity opacity-0 group-hover:opacity-100"
        onClick={handleNextClick}
      >
        &gt;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentImageIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
