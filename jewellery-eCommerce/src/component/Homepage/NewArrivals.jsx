import React from 'react';

const NewArrivals = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-40 py-6 bg-white">
      <h2 className="text-2xl font-light text-center mb-6 text-black tracking-widest">
        NEW ARRIVALS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-center gap-2">
        {[
          {
            img: 'https://pcchandraindia.com/cdn/shop/files/22K134NP25770_1.webp?v=1731581524',
            alt: 'Gold Earring',
            desc: 'Minimalist designs to modern styles.',
            title: 'Gold Earring',
          },
          {
            img: 'https://www.freeiconspng.com/uploads/solitaire-wedding-rings-png-11.png',
            alt: 'Ring',
            desc: 'Pure, perfect and priceless designs.',
            title: 'Ring',
          },
          {
            img: 'https://admin.pngadgil1832.com/UploadedFiles/ProductImages/KGNSET27_2GPNG_01.png',
            alt: 'Gold Bangles',
            desc: 'Trendy, traditional, designer & more.',
            title: 'Gold Bangles',
          },
          {
            img: 'https://png.pngtree.com/png-vector/20231205/ourmid/pngtree-carat-daimond-moissanite-sterling-silver-necklace-png-image_10852685.png',
            alt: 'Silver Pendant',
            desc: 'Where beauty and elegance combine!',
            title: 'Silver Pendant',
          },
          {
            img: 'https://png.pngtree.com/png-clipart/20230614/ourmid/pngtree-mangalsutra-a-gift-given-to-married-woman-on-her-honeymoon-png-image_7136611.png',
            alt: 'Mangalsutra',
            desc: 'Inspired by traditions; crafted to perfection.',
            title: 'Mangalsutra',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg text-center 
                       w-[90%] sm:w-48 md:w-58 h-64 
                       flex flex-col justify-center items-center p-4"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="w-[60%] h-auto mb-4"
            />
            <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
            <p className="text-sm font-normal text-gray-900 underline underline-offset-2">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;