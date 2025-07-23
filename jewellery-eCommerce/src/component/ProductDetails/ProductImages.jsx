import { FaExpandAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export default function ProductImages({ product, selectedImage, setSelectedImage, isImageModalOpen, setIsImageModalOpen }) {
    return (
        <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
                <div className="w-full max-w-[600px] mx-auto relative">
                    <div className="w-full" style={{ aspectRatio: '10 / 7' }}>
                        <img
                            src={product.images[selectedImage] || 'https://via.placeholder.com/600?text=No+Image'}
                            alt={product.prodname}
                            className="w-full h-full object-cover rounded-2xl shadow-md border border-gray-100 group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Expand Button */}
                <button
                    onClick={() => setIsImageModalOpen(true)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
                >
                    <FaExpandAlt className="text-gray-600" />
                </button>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
                        >
                            <FaChevronLeft className="text-gray-600" />
                        </button>
                        <button
                            onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300"
                        >
                            <FaChevronRight className="text-gray-600" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
                <div className="flex gap-3 justify-center">
                    {product.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                ? 'border-teal-700 shadow-md'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${product.prodname} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Modal */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl w-full">
                        <button
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 z-10"
                        >
                            <FaTimes />
                        </button>
                        <img
                            src={product.images[selectedImage]}
                            alt={product.prodname}
                            className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}