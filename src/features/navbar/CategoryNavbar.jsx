// src/features/navbar/CategoryNav.jsx
import { Link } from "react-router-dom";
import madeInIndiaImg from "../../assets/imgi_4_madeinindia.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
 
  fetchProductsByFiltersAsync,
} from "../product/productSlice";
const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home decoration",
  "furniture",
  "tops",
  "mens shirts",
  "womens watches",
];

function CategoryNavbar() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleCategoryClick = (category) => {
     dispatch(fetchProductsByFiltersAsync([category])); // set filter in Redux
     navigate("/products"); // redirect to ProductList page
   };
  return (
    <div className="bg-[#24A3B4] text-white shadow-sm fixed top-[80px] left-0 right-0 z-40 py-3">
      <nav className="flex justify-center items-center space-x-6 px-4 overflow-x-auto scrollbar-hide">
        <img className="h-6 w-auto mr-2" src={madeInIndiaImg} alt="Made in India" />
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className="whitespace-nowrap hover:underline text-sm font-medium"
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
}


export default CategoryNavbar;
