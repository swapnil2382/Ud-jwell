export default function ErrorState({ error }) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md border border-gray-200">
                <div className="text-red-500 text-5xl mb-4">⚠</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Not Found</h3>
                <p className="text-gray-600">{error}</p>
            </div>
        </div>
    );
}