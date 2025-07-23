// src/features/home/TopCategories.jsx

import React from "react";

const categories = [
  {
    id: 1,
    name: "Mobiles & Accessories",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116301/280/1/150681869-116301638-1688369559.jpg",
  },
  {
    id: 2,
    name: "Fashion Store",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116314/280/1/150681869-116314411-1688372105.jpg",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116313/280/1/150681869-116313899-1688371723.jpg",
  },
  {
    id: 4,
    name: "Daily Essentials",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116312/280/1/150681869-116312627-1688371331.jpg",
  },
  {
    id: 5,
    name: "Refurbished Store",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116299/280/1/150681869-116299707-1688369278.jpg",
  },
  {
    id: 6,
    name: "Refurbished Store",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116299/280/1/150681869-116299707-1688369278.jpg",
  },
  {
    id: 7,
    name: "Refurbished Store",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116299/280/1/150681869-116299707-1688369278.jpg",
  },
  {
    id: 8,
    name: "Refurbished Store",
    image:
      "https://cdn.shopclues.com/images1/thumbnails/116299/280/1/150681869-116299707-1688369278.jpg",
  },
];

function TopCategories() {
  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🎯 Top Categories
      </h2>
      <div className="overflow-x-auto whitespace-nowrap space-x-4 flex p-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="inline-block w-40 flex-shrink-0 border rounded-md p-2 hover:shadow-sm transition-all text-center bg-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-24 mx-auto object-contain"
            />
            <p className="mt-2 text-sm text-gray-700">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
