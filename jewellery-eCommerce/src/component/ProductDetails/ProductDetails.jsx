import { FaHeart } from 'react-icons/fa';

export default function ProductDetails({ product, isLiked, toggleLike }) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-3">{product.prodname}</h1>
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full capitalize">
                    {product.category}
                </span>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Product Details</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Metal:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.metal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">For:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.gender}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Occasion:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.occasion}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm font-medium">Purity:</span>
                        <span className="text-gray-800 font-semibold capitalize">{product.purity}</span>
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