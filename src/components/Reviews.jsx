import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

// Review data
const reviews = [
  {
    id: 1,
    image: "/src/images/rev1.jpg",
    review:
      "Exceptional service and fantastic quality! The team was attentive to our needs and delivered exactly what we wanted. We’re thrilled with the results and highly recommend their services to others.",
  },
  {
    id: 2,
    image: "/src/images/rev2.jpg",
    review:
      "Outstanding experience from start to finish. The attention to detail and professionalism exceeded our expectations. The final product was flawless, and we couldn’t be happier with the outcome.",
  },
  {
    id: 3,
    image: "/src/images/rev3.jpg",
    review:
      "Highly impressed with the prompt service and top-notch quality. The staff were knowledgeable and provided valuable insights. The final deliverable was perfect and on time. Will definitely use their services again.",
  },
];

const Reviews = () => {
  return (
    <div className="py-10 dark:bg-customBlack bg-customWhite">
      <div  data-aos="fade-up">
        <div className="text-center pb-10">
          <h1 className="font-semibold text-2xl text-customBlack dark:text-customWhite">
            What Our Clients Say
          </h1>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]} // Register Swiper modules
          pagination={{ clickable: true }} // Enable pagination
          spaceBetween={20} // Space between slides
          slidesPerView={1} // One slide per view
          autoplay={{ delay: 5000 }}
          className="w-full">
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="flex flex-col items-center text-center pb-4">
              <p className="text-lg xl:text-lg text-customBlack dark:text-customWhite lg:px-52 px-16 pb-4">
                {review.review}
              </p>
              <div className="w-24 h-24 overflow-hidden rounded-full mb-4">
                <img
                  src={review.image}
                  alt={`Client ${review.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
