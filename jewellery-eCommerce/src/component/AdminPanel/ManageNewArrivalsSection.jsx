import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const ManageNewArrivalsSection = ({
  filteredNewArrivals,
  loading,
  handleDeleteNewArrival,
  startEditingNewArrival,
  newArrivalsCount,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <h2 className="text-2xl font-light text-center mb-6 text-slate-900 tracking-widest">
        MANAGE NEW ARRIVALS
      </h2>
      <div className="mb-6 p-4 bg-slate-50 rounded-xl text-center text-sm font-semibold text-slate-600">
        {newArrivalsCount === 5
          ? 'Maximum of 5 new arrivals reached. You can edit existing cards.'
          : `You have ${newArrivalsCount}/5 new arrivals. Add ${5 - newArrivalsCount} more card${5 - newArrivalsCount === 1 ? '' : 's'} to reach the required 5 for the homepage display.`}
      </div>
      {loading ? (
        <div className="text-center text-slate-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
          {filteredNewArrivals.length === 0 ? (
            <p className="text-slate-600 col-span-full text-center">
              No new arrivals found. Please add 5 new arrivals.
            </p>
          ) : (
            filteredNewArrivals.map((arrival) => (
              <div
                key={arrival._id}
                className="bg-gray-100 rounded-lg text-center w-full max-w-xs h-auto flex flex-col justify-center items-center p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={arrival.imageUrl}
                  alt={arrival.altText}
                  className="w-[60%] h-auto mb-4 object-contain"
                />
                <h3 className="text-sm font-normal text-gray-900 underline underline-offset-2 mb-2">
                  {arrival.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{arrival.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEditingNewArrival(arrival)}
                    className="px-4 py-2 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-all duration-300 flex items-center shadow-sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  {newArrivalsCount < 5 && (
                    <button
                      onClick={() => handleDeleteNewArrival(arrival._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 flex items-center shadow-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManageNewArrivalsSection;