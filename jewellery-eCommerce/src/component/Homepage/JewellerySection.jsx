import React from 'react';
import { useNavigate } from 'react-router-dom';

const JewellerySection = () => {
  const navigate = useNavigate();

  const categories = [
    { img: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/32115604/2025/2/5/6a24a321-28bf-48f5-a833-4c852bd4de971738732147891-Zeraki-Jewels-Radhika-Set-Of-4-Gold-Plated-Bangles-451173873-2.jpg', title: 'Bangles' },
    { img: 'https://images-static.nykaa.com/media/catalog/product/4/5/459410fn73395_1.jpg', title: 'Necklace' },
    { img: 'https://digitaldressroom.com/cdn/shop/files/Photo01-03-24_32548PM.jpg?v=1734459484', title: 'Mangal Sutra' },
    { img: 'https://karatcart.com/cdn/shop/products/IMG_01411500x2000.jpg?v=1653734313', title: 'Earrings' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-20 py-10">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 ml-0 md:ml-20">
       <img
  src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/4cca7c80712459.5ce8ee4cc3fad.jpg"
  alt="Model"
  className="w-full md:w-[50%] h-[350px] object-cover rounded-tr-4xl rounded-br-4xl"
/>

        <div className="w-full md:w-[30%] flex flex-col justify-center text-center md:text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-2 leading-snug">
            Gold That Tells <br />
            A Timeless Story
          </h2>
<div className="w-26 border-b-2 border-blue-800 mx-auto md:ml-auto mt-2"></div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full md:w-[95%] py-10 px-6 rounded-xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Explore Button as Card */}
          <div className="flex flex-col items-center justify-center w-[90%] sm:w-[200px] h-[200px]">
            <div
              onClick={() => navigate('/products')}
              className="flex items-center justify-center w-full h-[60px] bg-blue-900 text-white rounded-4xl cursor-pointer"
            >
              <span className="font-semibold text-center">Explore</span>
            </div>
          </div>

          {/* Product Cards */}
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[100%] sm:w-[200px]"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-[100%] sm:w-[200px] h-[200px] rounded-lg object-cover mb-3"
              />
              <p className="text-lg font-semibold text-center">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JewellerySection;