import { FaHeart } from 'react-icons/fa';

export default function ProductDetails({ product, isLiked, toggleLike }) {
    console.log('ProductDetails product prop:', product); // Debug log to inspect product data

    const normalizeBooleanField = (value) => {
      if (value === 'yes' || value === true) return 'Yes';
      if (value === 'no' || value === false) return 'No';
      return 'Not specified';
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-3">{product.prodname || 'Unnamed Product'}</h1>
                <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full capitalize">
                        {product.category || 'No Category'}
                    </span>
                    {product.filterLists?.includes('new arrivals') && (
                        <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                            New Arrival
                        </span>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Product Details</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Metal:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.metal || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">For:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.gender || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Occasion:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.occasion || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Purity:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.purity || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Customizable:</span>
                        <span className="text-gray-800 font-semibold capitalize">
                            {normalizeBooleanField(product.customizable)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Description:</span>
                        <span className="text-gray-800 font-semibold">{product.description || 'No description available'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Availability:</span>
                        <span className={`font-semibold ${product.available ? 'text-teal-700' : 'text-red-600'}`}>
                            {product.available ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Wishlist Button */}
            <div>
                <button
                    onClick={toggleLike}
                    className={`w-full py-3 border-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isLiked
                        ? 'border-teal-700 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                >
                    <FaHeart className={isLiked ? 'text-teal-700' : 'text-gray-400'} />
                    {isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
        </div>
    );
}