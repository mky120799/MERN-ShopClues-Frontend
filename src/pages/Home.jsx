import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import CategoryNavbar from "../features/navbar/CategoryNavbar";
import HeroBanner from "../features/home/HeroBanner";
import DealsOfTheDay from "../features/home/DealsOfTheDay";
import TopCategories from "../features/home/TopCategories";

function Home() {
    return (
      <div className="bg-[#EEF7FA] min-h-screen">
        <NavBar>
          <CategoryNavbar></CategoryNavbar>
          <HeroBanner />
          <DealsOfTheDay />
          <TopCategories />
        </NavBar>
        <Footer></Footer>
      </div>
    );
}

export default Home;