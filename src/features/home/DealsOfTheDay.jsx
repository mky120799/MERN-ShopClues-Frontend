// src/features/home/DealsOfTheDay.jsx

import { useEffect, useState } from "react";

function DealsOfTheDay() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    // Replace with actual API if available
    const dummyDeals = [
      {
        id: 1,
        image:
          "https://cdn.shopclues.com/images1/thumbnails/116369/280/1/150681869-116369973-1688472145.jpg",
        title: "Smartwatch @ ₹599",
      },
      {
        id: 2,
        image:
          "https://cdn.shopclues.com/images1/thumbnails/116389/280/1/150681869-116389107-1688463544.jpg",
        title: "Wireless Earbuds @ ₹799",
      },
      {
        id: 3,
        image:
          "https://cdn.shopclues.com/images1/thumbnails/116369/280/1/150681869-116369985-1688472163.jpg",
        title: "Sneakers Starting ₹499",
      },
      {
        id: 4,
        image:
          "https://cdn.shopclues.com/images1/thumbnails/116369/280/1/150681869-116369985-1688472163.jpg",
        title: "Sneakers Starting ₹499",
      },
      {
        id: 5,
        image:
          "https://cdn.shopclues.com/images1/thumbnails/116369/280/1/150681869-116369985-1688472163.jpg",
        title: "Sneakers Starting ₹499",
      },
      {
        id: 6,
        image:
          "https://cdn.shopclues.com/images1/thumbnails/116369/280/1/150681869-116369985-1688472163.jpg",
        title: "Sneakers Starting ₹499",
      },
    ];

    setDeals(dummyDeals);
  }, []);

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        🔥 Deals of the Day
      </h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex-none w-64 gap-3 items-center border p-2 rounded hover:shadow-sm transition-all"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-16 h-16 object-contain rounded"
            />
            <p className="text-sm font-medium text-gray-700">{deal.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealsOfTheDay;
