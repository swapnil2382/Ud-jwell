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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
  <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2">
    Testimonials
  </h1>
  <p className="text-gray-500 text-lg">Real feedback from our happy customers</p>
</div>


        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 relative text-center">
          {/* Quote Icon */}
          <div className="absolute top-4 left-4 text-teal-00">
            <Quote className="w-7 h-7" />
          </div>

          {/* Profile Image */}
          <div className="mx-auto mb-4 w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200">
            <img
              src={testimonialsData[currentIndex].image}
              alt={testimonialsData[currentIndex].name}
              className="w-full h-full object-cover"
            />
          </div>


          {/* Text */}
          <blockquote className="text-gray-700 text-sm md:text-base italic mb-3">
            "{testimonialsData[currentIndex].text}"
          </blockquote>

          {/* Name & Location */}
          <div className="text-sm font-semibold text-gray-800">
            {testimonialsData[currentIndex].name}
          </div>
          <div className="text-xs text-teal-700">
            {testimonialsData[currentIndex].location}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-teal-700 scale-125" : "bg-teal-300 hover:bg-teal-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
