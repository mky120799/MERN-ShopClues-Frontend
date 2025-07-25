// import firstItem from "../../assets/dealsOfDay/imgi_86_153596495-117910384-1728887255.jpg";
// import secondItem from "../../assets/dealsOfDay/imgi_107_149847355-107160132-1590790597.jpg";
// import thirdItem from "../../assets/dealsOfDay/imgi_106_142772233-95250978-1544273464.jpg";
// import fourthItem from "../../assets/dealsOfDay/imgi_88_153596496-117910369-1728823521.jpg";
// import fifthItem from "../../assets/dealsOfDay/imgi_92_153500910-117557643-1709640783.jpg";
// import sixth

import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByFiltersAsync, selectAllProducts } from "../product/productSlice";
import { useEffect } from "react";

function DealsOfTheDay() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  console.log('products from deals of the day', products);

  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync({ filter: {}, sort: {}, pagination: { _page: 1, _limit: 10 }, admin: false }));
  }, [dispatch]);

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4 min-h-[300px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        🔥 Deals of the Day
      </h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {products?.map((deal) => (
          <div
            key={deal.id}
            className="group flex-none w-72 p-4 rounded-lg bg-white border border-gray-300 transition-all duration-300 transform hover:scale-100 hover:shadow-2xl hover:border-gray-500"
          >
            <img
              src={deal.images[0]}
              alt={deal.title}
              className="w-40 h-40 object-contain rounded transition-transform duration-300 group-hover:scale-110"
            />
            <p className="text-sm font-medium text-gray-700">{deal.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealsOfTheDay;
