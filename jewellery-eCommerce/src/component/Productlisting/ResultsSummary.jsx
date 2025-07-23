export default function ResultsSummary({ filteredItems, jewelleryItems }) {
  return (
    <div className="container mx-auto px-4 pb-6">
      <div className="text-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-800">{filteredItems.length}</span> of <span className="font-semibold text-gray-800">{jewelleryItems.length}</span> items
        </p>
      </div>
    </div>
  );
}