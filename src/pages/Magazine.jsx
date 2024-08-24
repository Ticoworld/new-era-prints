import React from "react";
import Header from "../components/Header";
import MagazineShowCase from "../components/MagazineShowCase";
import AboutFaceOfMagazine from "../components/AboutFaceOfMagazine";
import FaceOfMagPastYear from "../components/FaceOfMagPastYear";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../components/Footer";

// Import Swiper styles

// Array of images for the Swiper
const images = [
  { id: 1, src: "/images/mag2.jpeg", alt: "Magazine Image 1" },
  { id: 2, src: "/images/mag3.jpeg", alt: "Magazine Image 2" },
  { id: 3, src: "/images/mag1.jpeg", alt: "Magazine Image 3" },
];

const Magazine = () => {
  return (
    <div>
      <div>
        <Header />
        <MagazineShowCase />
        <AboutFaceOfMagazine />
        <FaceOfMagPastYear />
        {/*  */}
        <div>
          <div className="bg-customWhite dark:bg-customBlack py-20">
            <div>
              <h1
                className="text-customBlack dark:text-customWhite font-semibold text-center text-2xl"
                data-aos="fade-up">
                HOW TO REGISTER
              </h1>
              <div className="text-customBlack dark:text-customWhite lg:px-36 px-5 flex justify-between flex-col gap-8 pt-8 ">
                <p data-aos="fade-up">
                  New Era Digital Prints International Ltd is a premier printing
                  press company located in Abuja, Nigeria. Established in 2024,
                  our company has quickly become a trusted name in the printing
                  industry, offering high-quality printing services to
                  businesses and individuals alike.
                </p>
                <p data-aos="fade-up">
                  At New Era Digital Prints International Ltd, we pride
                  ourselves on our commitment to excellence and customer
                  satisfaction. Our team of skilled professionals utilizes the
                  latest technology and equipment to deliver top-notch printing
                  solutions that meet the unique needs of our clients.
                </p>
                <p data-aos="fade-up" id="about">
                  Whether you need business cards, gift bags, T-shirt branding,
                  monogram, brochures, banners, office profile, wedding
                  programme, invitation cards, jotters, calendars, posters,
                  stickers, letterheads or any other printed materials, we have
                  the expertise and resources to bring your vision to life. We
                  understand the importance of branding and marketing in today's
                  competitive business landscape, and we are dedicated to
                  helping our clients stand out from the crowd with eye-catching
                  and professional printing products.
                </p>
                <p data-aos="fade-up">
                  In addition to our printing services, New Era Digital Prints
                  International Ltd also offers graphic design and consultation
                  services to ensure that your printed materials are visually
                  appealing and effective in conveying your message.
                </p>
                <p data-aos="fade-up">
                  Choose New Era Digital Prints International Ltd for all your
                  printing needs and experience the difference that our
                  expertise and dedication can make for your business. Contact
                  us today to learn more about our services and how we can help
                  you achieve your printing goals.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}

        {/* SwiperJS component */}
        <div className="bg-customWhite dark:bg-customBlack py-20">
          <div data-aos="fade-up">
            <div className="lg:px-36 px-5 pt-8">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                autoplay
                pagination={{ clickable: true }}>
                {images.map((image) => (
                  <SwiperSlide
                    key={image.id}
                    className="flex items-center justify-center" // Center the image
                  >
                    <div className="bg-customBlue dark:bg-customGray w-[300px] h-[400px] flex items-center justify-center">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Magazine;
