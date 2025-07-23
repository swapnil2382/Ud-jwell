import { Link } from 'react-router-dom';

export default function RelatedProducts({ relatedProducts, capitalizedCategory }) {
    if (relatedProducts.length === 0) return null;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Explore Similar {capitalizedCategory}s</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                    <div
                        key={item._id}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={item.images[0] || 'https://via.placeholder.com/400?text=No+Image'}
                                alt={item.prodname}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-teal-700 text-white' : 'bg-red-500 text-white'}`}>
                                {item.available ? 'In Stock' : 'Out of Stock'}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                                {item.prodname}
                            </h3>

                            <p className="text-xs font-medium uppercase text-gray-800 bg-gray-200 px-2 py-1 rounded inline-block mb-3">
                                {item.category}
                            </p>

                            <Link
                                to={`/product/${item._id}`}
                                className={`block w-full py-2 px-4 rounded-xl font-medium text-center transition-all duration-300 ${item.available
                                    ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-md hover:shadow-lg'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {item.available ? 'View Details' : 'Out of Stock'}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}