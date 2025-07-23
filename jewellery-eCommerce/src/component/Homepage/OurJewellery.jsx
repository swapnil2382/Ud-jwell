import React from 'react';

const OurJewellery = () => {
  const items = [
    { img: 'https://media.istockphoto.com/id/1731025013/photo/gold-chain-on-black-silk-fabric-background.jpg?s=612x612&w=0&k=20&c=EiSzB3qgfp75RFPfxT9uXBinf8q9ZsxwwlM7cjQUUE4=', title: 'Chains', subtitle: 'Gold Chains' },
    { img: 'https://images.stockcake.com/public/2/a/c/2ac43696-0a26-4204-862d-3d8b68d0a43a_large/elegant-diamond-ring-stockcake.jpg', title: 'Ring', subtitle: 'Stunning' },
    { img: 'https://manubhai.in/SocialMedia/post_artworks/20022018085140IMG_28191.jpg', title: 'Mangalsutras', subtitle: 'Modern' },
    { img: 'https://static.vecteezy.com/system/resources/thumbnails/046/987/892/small_2x/intricately-designed-antique-gold-pendant-on-elegant-chain-against-dark-blue-background-with-ornate-detailing-symbolizing-classic-luxury-jewelry-and-timeless-beauty-photo.jpeg', title: 'Pendants', subtitle: 'Trendy' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA0v018wBOyb4lME7X-VVmmoSnM7-mtd3zxw&s', title: 'Bangles', subtitle: 'Gorgeous' },
    { img: 'https://www.shutterstock.com/image-photo/beautiful-golden-ring-pair-earrings-260nw-1082150579.jpg', title: 'Earrings', subtitle: 'Stylish' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-6 bg-white">
      <h2 className="text-2xl font-light text-center mb-6 text-black tracking-widest">OUR JEWELLERY</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-full overflow-hidden h-[120px] sm:h-[150px] w-full flex items-center justify-start px-8"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-opacity-20"></div>
            <div className="relative z-10 text-left text-white font-semibold">
              <p className="text-base">{item.subtitle}</p>
              <p className="text-xl font-bold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurJewellery;