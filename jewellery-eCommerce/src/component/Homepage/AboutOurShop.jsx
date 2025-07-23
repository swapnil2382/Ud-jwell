import React from 'react';

const AboutOurShop = () => {
  return (
    <div className="px-[5vw] mb-10">
      
      <h1 className="text-3xl font-light text-center mb-6 text-gray-700">About Our Store</h1>

      <div className="relative w-full h-96 overflow-hidden mx-auto rounded-2xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://thevoiceofchandigarh.com/wp-content/uploads/2024/08/Image-5.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center h-full px-6 py-4 text-white">
          <div className="ml-6 text-lg font-light max-w-md">
            <h2 className="text-2xl font-light mb-2">An Enduring Legacy</h2>
            <p>
              ORRA, The Fine Diamond Jewellery Destination, immerses you in an atmosphere of fine aesthetics, showcasing jewellery that is resonant with Indian tradition and inspired by a rich Belgian Legacy. Every ORRA store across India evokes elegance and style, with the interiors, an ode to exceptional finesse, global tastes and refined sensibilities.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutOurShop;
