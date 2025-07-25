import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import CategoryNavbar from "../features/navbar/CategoryNavbar";
import HeroBanner from "../features/home/HeroBanner";
import DealsOfTheDay from "../features/home/DealsOfTheDay";
import TopCategories from "../features/home/TopCategories";

function Home() {
    return (
      <div className="bg-[##FFFFFF] lg:bg-[#EEF7FA] min-h-screen relative">
        <NavBar>
          <div className="hidden lg:block">
            <CategoryNavbar></CategoryNavbar>
            <HeroBanner />
            <DealsOfTheDay />
            <TopCategories />
          </div>
        </NavBar>
        <div className="block lg:hidden top-[10px]">
          <ProductList></ProductList>
        </div>
        <Footer></Footer>
      </div>
    );
}

export default Home;