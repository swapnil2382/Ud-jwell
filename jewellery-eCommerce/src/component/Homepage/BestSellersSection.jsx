import React from 'react';

const BestSellers = () => {
  const products = [
    {
      img: 'https://5.imimg.com/data5/MY/QF/MY-63795617/gold-chains.jpg',
      title: 'Elegant Gold Chain',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--xLSE4TEABNNNFnODoGq3bzYdWH9IhCRsA&s',
      title: 'Royal Stunning Ring',
    },
    {
      img: 'https://images.meesho.com/images/products/435655628/xxevt_512.webp',
      title: 'Mangalsutra with Charm',
    },
    {
      img: 'https://5.imimg.com/data5/SELLER/Default/2021/6/VY/GT/QJ/12768317/540a-jpg-500x500.jpg',
      title: 'Gorgeous Gold Bangles',
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-40 py-10">
      <h2 className="text-2xl sm:text-3xl font-light text-center mb-2 text-gray-700">OUR BEST SELLERS</h2>
      <p className="text-sm sm:text-base text-center text-gray-500 mb-6">Check out our top jewellery choices that our buyers love the most</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <div key={index} className="text-center border border-gray-200 p-3 sm:p-4 rounded-lg shadow-sm">
            <img src={product.img} alt={product.title} className="w-full h-48 sm:h-56 md:h-64 object-cover mb-3 sm:mb-4 rounded" />
            <p className="text-sm sm:text-base text-gray-700">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
