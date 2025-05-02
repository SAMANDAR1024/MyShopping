import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { BAnnerType } from "@/store/types";



const Banner = () => {
  const [banners, setBanners] = useState<BAnnerType>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios.get("https://nt.softly.uz/api/front/banners").then((res) => {
      setBanners(res.data);
    });
  }, []);

  const handleNext = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="w-full px-4 md:px-8">
      <div className="relative w-full max-w-[1400px] mx-auto mt-4 h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] overflow-hidden rounded-2xl shadow-lg group">
        
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute top-1/2 left-2 sm:left-4 z-10 -translate-y-1/2 p-1 sm:p-2 bg-[#2C698D] rounded-full text-white hover:bg-black/60 transition"
        >
          ←
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute top-1/2 right-2 sm:right-4 z-10 -translate-y-1/2 p-1 sm:p-2 bg-[#2C698D] rounded-full text-white hover:bg-black/60 transition"
        >
          →
        </button>
        {banners.length > 0 ? (
          <div
            key={banners[current].id}
            className="w-full h-full transition-all duration-700 ease-in-out relative"
          >
            <Image
              src={banners[current].imageUrl}
              alt={banners[current].title}
              fill
              className="object-cover rounded-2xl"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 rounded-2xl flex items-end px-4 sm:px-6 pb-6">
              <p className="text-white text-sm sm:text-lg font-medium">{banners[current].title}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-center text-gray-500">
            Yuklanmoqda...
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
