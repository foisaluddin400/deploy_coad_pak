'use client'
import React, { useRef } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { MdStar } from "react-icons/md";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

// ✅ Import local images
import img7 from "../../../public/Home/fatima.jpg";
import img1 from "../../../public/Home/review2.jpg";
import img2 from "../../../public/Home/review3.jpg";
import img3 from "../../../public/Home/review4.jpg";
import img4 from "../../../public/Home/review5.jpg";
import img6 from "../../../public/Home/review3.jpg";

const Review = () => {
const testimonials = [
  {
    name: "Ahmed Al-Farsi",
    role: "Café Owner",
    img: img1,
     rating: 4,
    review:
      "ProfitableBusinessesForSale.com made selling my café so much easier. Within weeks of listing, I started getting genuine inquiries. Highly recommended!",
  },
  {
    name: "Sophie Laurent",
    role: "Small Business Owner",
    img: img2,
     rating: 4.9,
    review:
      "I was worried about finding buyers, but PBFS gave my business the right exposure. Their Premium Seller package was worth every penny.",
  },
  {
    name: "Rajesh Patel",
    role: "Entrepreneur",
    img: img3,
     rating: 5,
    review:
      "The valuation service helped me price my business correctly. I closed a deal in 4 months—faster than expected!",
  },
  {
    name: "Maria Gonzalez",
    role: "Franchise Owner",
    img: img4,
     rating: 4.4,
    review:
      "Listing our franchise on PBFS gave us international visibility. We received inquiries from investors in three different countries!",
  },
 
  {
    name: "Fatima Al-Mansoori",
    role: "Franchisor",
    img: img7,
     rating: 4.3,
    review:
      "Great platform for franchisors! The social media spotlight and priority placement really boosted our brand visibility.",
  },
  {
    name: "Omar Al-Habsi",
    role: "Salon Owner",
    img: img6,
     rating: 4.2,
    review:
      "I listed my salon equipment here and got it sold in less than two weeks. The inquiry alerts kept me updated instantly.",
  },

];

  const splideRef = useRef(null);

  const handlePrevClick = () => {
    splideRef.current?.splide.go("<");
  };

  const handleNextClick = () => {
    splideRef.current?.splide.go(">");
  };

  return (
    <div className="md:mt-20 mt-5">
      <div className="mb-11">
        <div className="text-center mb-12">
          <p className="text-blue-500 font-medium mb-2">Our Testimonials</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What our customers say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re buying or selling, our platform makes the process
            seamless and straightforward. Here&apos;s how it works according to our
            satisfied users:
          </p>
        </div>

        <div className="w-full">
          <Splide
            ref={splideRef}
            options={{
              type: "loop",
              perPage: 3,
              gap: "1rem",
              arrows: false,
              pagination: false,
              breakpoints: {
                1724: { perPage: 3 },
                968: { perPage: 2 },
                640: { perPage: 1 },
              },
            }}
            aria-label="Testimonials"
            className="w-full"
          >
            {testimonials.map((item, index) => (
              <SplideSlide key={index}>
                <div className="shadow-lg bg-[#FFFFFF] rounded-2xl p-4 py-8 h-full flex flex-col justify-between">
                  <div>
                 <div className="flex pb-3 items-center">
  {Array.from({ length: 5 }).map((_, i) => {
    if (i < Math.floor(item.rating)) {
      return <MdStar key={i} className="text-yellow-500" />;
    } else if (i < item.rating) {
      return <MdStar key={i} className="text-yellow-400 opacity-50" />;
    } else {
      return <MdStar key={i} className="text-gray-300" />;
    }
  })}

  <p className="ml-2 text-gray-600">({item.rating})</p>
</div>
                    <p className="text-sm mt-1 text-gray-700 italic">
                      {item?.review}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-5">
                    <div className="relative w-[60px] h-[60px]">
                      <Image
                        src={item?.img}
                        alt={item?.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        {item?.name}
                      </h5>
                      <p className="text-sm text-gray-500">{item?.role}</p>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* Custom Arrows */}
        <div className="flex gap-3 justify-center mt-5">
          <button
            className="bg-[#0091FF] p-2 rounded text-white"
            onClick={handlePrevClick}
          >
            <HiArrowNarrowLeft className="text-2xl" />
          </button>
          <button
            className="bg-[#0091FF] p-2 rounded text-white"
            onClick={handleNextClick}
          >
            <HiArrowNarrowRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
