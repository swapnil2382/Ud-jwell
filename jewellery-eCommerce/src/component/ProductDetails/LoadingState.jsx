export default function LoadingState() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-700 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading product details...</p>
            </div>
        </div>
    );
}