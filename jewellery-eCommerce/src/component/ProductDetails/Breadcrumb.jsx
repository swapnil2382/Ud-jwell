import { Link } from 'react-router-dom';

export default function Breadcrumb({ product, capitalizedCategory }) {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Link to="/" className="hover:text-teal-700 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/products" className="hover:text-teal-700 transition-colors capitalize">{capitalizedCategory}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium">{product.prodname}</span>
                </div>
            </div>
        </div>
    );
}