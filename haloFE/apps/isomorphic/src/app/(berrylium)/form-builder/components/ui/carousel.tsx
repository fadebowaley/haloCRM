import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronLeft as ArrowLeft, FiChevronRight as ArrowRight } from "react-icons/fi";
import { Button } from "../ui/button";

type CarouselProps = {
  slides: React.ReactNode[];
  className?: string;
};

const Carousel = ({ slides, className }: CarouselProps) => {
  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
      <Button
        className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2"
        variant="ghost"
        size="icon"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2"
        variant="ghost"
        size="icon"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Carousel;