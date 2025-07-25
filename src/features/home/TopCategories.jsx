import React, { useEffect, useState } from "react";

function TopCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/mens-shoes")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setCategories(data.products);
        }
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);
  console.log("categories in top category",categories)

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        🎯 Top Categories
      </h2>
      <div className="overflow-x-auto whitespace-nowrap space-x-4 flex p-2">
        {categories.map((product) => (
          <div
            key={product.id}
            className="inline-block w-70 flex-shrink-0 border rounded-md p-2 transition-all text-center bg-white hover:scale-105 hover:shadow-lg transform duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-24 w-full object-contain mb-2 transform transition-transform duration-300 hover:scale-110"
            />
            <p className="text-sm text-gray-700">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;
