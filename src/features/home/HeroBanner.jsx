// src/features/home/HeroBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import phones from '../../assets/phones.jpg';
import intel from "../../assets/imgi_9_intel_coreultra_web_18june.jpg";
import refurbished from "../../assets/imgi_8_smart-phone-web-11july25.jpg";
import madeInIndia from "../../assets/fasho.png"
import rightRefurbishedIphone from "../../assets/imgi_10_2Platinum_Srushty_14April23.jpg";
import virticleClothingImg from "../../assets/imgi_11_1Platinum_Srushty_14April23.jpg";
import { Autoplay } from "swiper/modules";
import thirdVerticleImg from "../../assets/imgi_12_3Platinum_Srushty_14April23.jpg";
import "swiper/css";
import { useState } from "react";

const banners = [
  {
    id: 1,
    image: phones,
    alt: "Banner 1",
    title: "Automotive Accessories",
  },
  {
    id: 2,
    image: intel,
    alt: "Banner 2",
    title: "BHARAT KA Wholesale Bazaar",
  },
  {
    id: 3,
    image: refurbished,
    alt: "Banner 3",
    title: "Refurbished Mobiles",
  },
  {
    id: 4,
    image: madeInIndia,
    alt: "made In Indai",
    title: "Made in India",
  },
];

function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="mt-[55px] w-full max-w-screen-xl mx-auto flex gap-4 h-[460px] ">
      {/* Left: Swiper Carousel */}
      <div className="flex-[3] bg-white shadow-md rounded-md overflow-hidden">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          className="rounded-md"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full object-cover h-[360px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-around mt-2 text-sm text-gray-600">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`px-2 pb-1 border-b-2 transition-all ${
                index === activeIndex
                  ? "text-[#24A3B4] font-medium border-[#24A3B4]"
                  : "border-transparent"
              }`}
            >
              {banner.title}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Vertical Product Cards */}
      <div className="flex-[1] flex flex-col gap-1">
        <img
          src={rightRefurbishedIphone}
          alt="Refurb Store"
          className="rounded-md shadow-md h-[150px] object-cover"
        />
        <img
          src={virticleClothingImg}
          alt="Fashion Store"
          className="rounded-md shadow-md h-[150px] object-cover"
        />
        <img
          src={thirdVerticleImg}
          alt="Best of Home"
          className="rounded-md shadow-md h-[150px] object-cover"
        />
      </div>
    </div>
  );
}

export default HeroBanner;
