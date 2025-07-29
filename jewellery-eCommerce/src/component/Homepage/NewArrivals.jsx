import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/new-arrivals`, {
          withCredentials: true,
        });
        if (response.data.status !== 'success') {
          throw new Error(response.data.message || 'Failed to fetch new arrivals');
        }
        setNewArrivals(response.data.data.newArrivals || []);
      } catch (err) {
        setError(err.message || 'Failed to load new arrivals');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-40 py-6 bg-white">
      <h2 className="text-2xl font-light text-center mb-6 text-black tracking-widest">
        NEW ARRIVALS
      </h2>
      {loading ? (
        <div className="text-center text-slate-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : newArrivals.length === 0 ? (
        <div className="text-center text-slate-600">No new arrivals available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-4">
          {newArrivals.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 rounded-lg text-center w-full max-w-xs h-auto flex flex-col justify-center items-center p-4"
            >
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="w-[60%] h-auto mb-4 object-contain"
              />
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-sm font-normal text-gray-900 underline underline-offset-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;