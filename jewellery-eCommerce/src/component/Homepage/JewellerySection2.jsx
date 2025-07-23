import React from 'react';
import { useNavigate } from 'react-router-dom';

const JewellerySection = () => {
  const navigate = useNavigate();

  const categories = [
    { img: 'https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1392/1715087300_7baa82e557eaa8d19ed4.jpg', title: 'Rings' },
    { img: 'https://www.radheimitation.in/cdn/shop/files/WhatsAppImage2024-05-16at4.15.28PM@2x.jpg?v=1715860950', title: 'Braclate' },
    { img: 'https://www.jiomart.com/images/product/original/rvzpevrzb1/lux-link-jewellery-new-high-stylish-men-s-fashion-big-cap-with-flower-design-best-chain-product-images-rvzpevrzb1-0-202405091204.jpg?im=Resize=(420,420)', title: 'Chain' },
    { img: 'https://m.media-amazon.com/images/I/51CSd-T2rNL._AC_.jpg', title: 'Pendant' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-20 py-10">
      {/* Top Section */}
     <div className="flex flex-col md:flex-row gap-4 mb-8 ml-0 md:ml-20">
  <div className="w-full md:w-[40%] flex flex-col justify-center text-center md:text-center order-2 md:order-1">
    <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-2 leading-snug">
      A Legacy In <br />
      Every Piece
    </h2>
<div className="w-26 border-b-2 border-blue-800 mx-auto md:ml-auto mt-2"></div>
  </div>
  <img
    src="https://www.manyavar.com/dw/image/v2/BJZV_PRD/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dw5bc91613/Blogs-Images/Top%205%20Groom%20Accessories%20That%20Will%20Make%20You%20Stand%20Out%20BLOG1.jpg"
    alt="Model"
    className="w-full md:w-[50%] h-[350px] object-cover rounded-tl-4xl rounded-bl-4xl order-1 md:order-2"
  />
</div>


      {/* Bottom Section */}
      <div className="w-full md:w-[95%] py-10 px-6 rounded-xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
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
          <div className="flex flex-col items-center justify-center w-[90%] sm:w-[200px] h-[200px]">
            <div
              onClick={() => navigate('/products')}
              className="flex items-center justify-center w-full h-[60px] bg-blue-900 text-white rounded-4xl cursor-pointer"
            >
              <span className="font-semibold text-center">Explore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewellerySection;