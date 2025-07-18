import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonialsData = [
  {
    id: 1,
    name: "Nidhi Das",
    location: "Kolkata",
    text: "Just purchased a necklace set from this store. The staff were welcoming. They had a thorough knowledge about the products and also guided us to buy a good product. I was overwhelmed by their good gesture.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    name: "Ravi Kumar",
    location: "Mumbai",
    text: "Amazing experience! The jewelry quality is top-notch and the service was exceptional. Highly recommend this store.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Delhi",
    text: "Beautiful designs and excellent customer service. I found the perfect earrings for my sister's wedding!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 4,
    name: "Amit Patel",
    location: "Bangalore",
    text: "The staff was very helpful and the collection is stunning. Will definitely visit again.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Chennai",
    text: "Great quality jewelry at reasonable prices. The purchase process was smooth and quick.",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">
            Customer Testimonials
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what our valued customers have to say about their experiences
          </p>
        </div>

        <div className={`relative bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-6 left-6 text-teal-600">
            <Quote className="w-8 h-8 opacity-20" />
          </div>
          <div className="absolute bottom-6 right-6 text-teal-600 rotate-180">
            <Quote className="w-8 h-8 opacity-20" />
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6 w-20 h-20 rounded-full overflow-hidden ring-4 ring-teal-100">
              <img
                src={testimonialsData[currentIndex].image}
                alt={testimonialsData[currentIndex].name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex mb-4">
              {[...Array(testimonialsData[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-gray-700 text-base md:text-lg italic mb-6 max-w-3xl mx-auto leading-relaxed">
              "{testimonialsData[currentIndex].text}"
            </blockquote>

            <div className="text-base font-medium text-gray-900">
              {testimonialsData[currentIndex].name}
            </div>
            <div className="text-sm text-teal-600 font-medium">
              {testimonialsData[currentIndex].location}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-teal-600 scale-125"
                  : "bg-gray-300 hover:bg-teal-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;