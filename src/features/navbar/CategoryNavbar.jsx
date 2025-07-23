// src/features/navbar/CategoryNav.jsx
import { Link } from "react-router-dom";
import madeInIndiaImg from "../../assets/imgi_4_madeinindia.png";

const categories = [
  "Mobiles",
  "Electronics",
  "Men",
  "Women",
  "Home & Kitchen",
  "Appliances",
  "Sports",
  "Beauty",
  "Books",
  "Toys",
];

function CategoryNavbar() {
  return (
    <div className="bg-[#24A3B4] text-white shadow-sm fixed top-[92px] left-0 right-0 z-40 py-3">
      <nav className="flex justify-center items-center space-x-6 px-4 overflow-x-auto scrollbar-hide">
        <img className="h-6 w-auto mr-2" src={madeInIndiaImg} alt="Made in India" />
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
            className="whitespace-nowrap hover:underline text-sm font-medium"
          >
            {category}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default CategoryNavbar;
