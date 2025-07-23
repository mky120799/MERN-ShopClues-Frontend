// src/features/home/HeroBanner.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import phones from '../../assets/phones.jpg';
import intel from "../../assets/imgi_9_intel_coreultra_web_18june.jpg";
import refurbished from "../../assets/imgi_8_smart-phone-web-11july25.jpg";
import madeInIndia from "../../assets/fasho.png"

import { Autoplay } from "swiper/modules";
import "swiper/css";

const banners = [
  {
    id: 1,
    image: phones,
    alt: "Banner 1",
  },
  {
    id: 2,
    image: intel,
    alt: "Banner 2",
  },
  {
    id: 3,
    image: refurbished,
    alt: "Banner 3",
  },
  {
    id: 4,
    image: refurbished,
    alt: madeInIndia,
  },
];

function HeroBanner() {
  return (
    <div className="mt-[55px] w-full max-w-screen-xl mx-auto flex gap-4 ">
      {/* Left: Swiper Carousel */}
      <div className="flex-[3] bg-white shadow-md rounded-md overflow-hidden">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          className="rounded-md"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full object-cover h-[300px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right: Vertical Product Cards */}
      <div className="flex-[1] flex flex-col gap-4">
        <img
          src="https://cdn.shopclues.com/images/home/furb-store.jpg"
          alt="Refurb Store"
          className="rounded-md shadow-md"
        />
        <img
          src="https://cdn.shopclues.com/images/home/fashion-store.jpg"
          alt="Fashion Store"
          className="rounded-md shadow-md"
        />
        <img
          src="https://cdn.shopclues.com/images/home/home-store.jpg"
          alt="Best of Home"
          className="rounded-md shadow-md"
        />
      </div>
    </div>
  );
}

export default HeroBanner;
