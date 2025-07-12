import React, { useState, useEffect } from "react";

const testimonialsData = [
  {
    id: 1,
    name: "Nidhi Das",
    location: "Kolkata",
    text: "Just purchased a necklace set from this store. The staff were welcoming. They had a thorough knowledge about the products and also guided us to buy a good product. I was overwhelmed by their good gesture.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    location: "Mumbai",
    text: "Amazing experience! The jewelry quality is top-notch and the service was exceptional. Highly recommend this store.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Delhi",
    text: "Beautiful designs and excellent customer service. I found the perfect earrings for my sister’s wedding!",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Amit Patel",
    location: "Bangalore",
    text: "The staff was very helpful and the collection is stunning. Will definitely visit again.",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    location: "Chennai",
    text: "Great quality jewelry at reasonable prices. The purchase process was smooth and quick.",
    image: "https://via.placeholder.com/50",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md text-center relative overflow-hidden">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`flex flex-col items-center transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute"
            }`}
            style={{
              transform:
                index === currentIndex ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="rounded-full mb-2"
            />
            <p className="text-gray-700 mb-2">{testimonial.text}</p>
            <p className="font-semibold">
              {testimonial.name}, {testimonial.location}
            </p>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        {testimonialsData.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
