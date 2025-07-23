import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../component/ProductDetails/Breadcrumb';
import ProductImages from '../component/ProductDetails/ProductImages';
import ProductDetails from '../component/ProductDetails/ProductDetails';
import RelatedProducts from '../component/ProductDetails/RelatedProducts';
import LoadingState from '../component/ProductDetails/LoadingState';
import ErrorState from '../component/ProductDetails/ErrorState';
import NotFoundState from '../component/ProductDetails/NotFoundState';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetail({ user }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const navigate = useNavigate();

    // Fetch product details and related products
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const [productResponse, relatedResponse] = await Promise.all([
                    axios.get(`${API_BASE_URL}/jewellery/${id}`, { withCredentials: true }),
                    axios.get(`${API_BASE_URL}/jewellery`, { withCredentials: true }),
                ]);

                const fetchedProduct = productResponse.data.data;
                setProduct(fetchedProduct);
                const related = relatedResponse.data.data
                    .filter(item => item.category === fetchedProduct.category && item._id !== id)
                    .slice(0, 4);
                setRelatedProducts(related);
                setLoading(false);
            } catch (err) {
                setError(`Failed to fetch product details: ${err.response?.data?.message || err.message}`);
                setLoading(false);
                console.error('Error fetching product:', err.response?.data || err);
            }
        };

        // Fetch wishlist separately
        const fetchWishlist = async () => {
            if (!user || !user._id) {
                setIsLiked(false);
                return;
            }
            try {
                console.log(`Checking wishlist for user ${user._id}, product ${id}`);
                const response = await axios.get(`${API_BASE_URL}/wishlists/${user._id}`, { withCredentials: true });
                const wishlist = response.data.data;
                const isProductInWishlist = wishlist?.items?.some(item => item._id === id) || false;
                setIsLiked(isProductInWishlist);
                console.log(`Product ${id} in wishlist: ${isProductInWishlist}`);
            } catch (err) {
                setIsLiked(false); // Default to false if wishlist fetch fails
                console.error(`Error fetching wishlist: ${err.response?.data?.message || err.message}`);
            }
        };

        fetchProduct();
        fetchWishlist();
    }, [id, user]);

    // Toggle wishlist item
    const toggleLike = async () => {
        if (!user || !user._id) {
            alert('Please log in to manage your wishlist');
            navigate('/login');
            return;
        }
        try {
            console.log(`Toggling wishlist for product ${id}, user ${user._id}, isLiked: ${isLiked}`);
            if (isLiked) {
                await axios.delete(`${API_BASE_URL}/wishlists/${user._id}/${id}`, {
                    withCredentials: true,
                });
                setIsLiked(false);
                console.log(`Removed product ${id} from wishlist`);
            } else {
                await axios.post(
                    `${API_BASE_URL}/wishlists`,
                    { userId: user._id, productId: id },
                    { withCredentials: true }
                );
                setIsLiked(true);
                console.log(`Added product ${id} to wishlist`);
            }
        } catch (err) {
            const errorMessage = `Failed to update wishlist: ${err.response?.data?.message || err.message}`;
            setError(errorMessage);
            console.error('Error updating wishlist:', err.response?.data || err);
        }
    };

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} />;
    }

    if (!product) {
        return <NotFoundState />;
    }

    // Capitalize the category for display
    const capitalizedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);

    return (
        <div className="min-h-screen bg-white">
            <Breadcrumb product={product} capitalizedCategory={capitalizedCategory} />
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <ProductImages
                        product={product}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        isImageModalOpen={isImageModalOpen}
                        setIsImageModalOpen={setIsImageModalOpen}
                    />
                    <ProductDetails
                        product={product}
                        isLiked={isLiked}
                        toggleLike={toggleLike}
                    />
                </div>
                <RelatedProducts
                    relatedProducts={relatedProducts}
                    capitalizedCategory={capitalizedCategory}
                />
            </div>
        </div>
    );
}