import React from 'react';
import { useNavigate } from 'react-router-dom';

const OurCollection = () => {
  const navigate = useNavigate();

  const handleNavigation = (metal) => {
    navigate(`/products?metal=${metal}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-light text-center mb-10 text-gray-700">OUR COLLECTION</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">

        {/* Gold Button */}
        <button
          onClick={() => handleNavigation('gold')}
          className="relative rounded-4xl shadow-lg overflow-hidden w-full sm:w-[28rem] h-80 flex items-center justify-start p-6 focus:outline-none hover:shadow-2xl cursor-pointer group"
          aria-label="View Gold Collection"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url('https://i.ytimg.com/vi/OiUO81M0-Ps/maxresdefault.jpg')`,
            }}
          ></div>

          {/* Overlay */}
          <div className="relative bg-opacity-50 hover:bg-opacity-70 p-4 rounded-md transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-300">Gold</div>
          </div>
        </button>

        {/* Silver Button */}
        <button
          onClick={() => handleNavigation('silver')}
          className="relative rounded-4xl shadow-lg overflow-hidden w-full sm:w-[28rem] h-80 flex items-center justify-start p-6 focus:outline-none hover:shadow-2xl cursor-pointer group"
          aria-label="View Silver Collection"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url('https://jewelleryworld.net.au/wp-content/uploads/2009/01/pexels-emre-vonal-7700270-1024x684.jpg')`,
            }}
          ></div>

          {/* Overlay */}
          <div className="relative bg-opacity-50 hover:bg-opacity-70 p-4 rounded-md transition-all duration-300">
            <div className="text-3xl font-bold text-white">Silver</div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default OurCollection;
