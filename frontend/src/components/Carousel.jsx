import Slider from "react-slick";
import FoodCard from "./FoodCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function Carousel() {
  const { foodlist } = useContext(StoreContext);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-4 rounded-2xl overflow-hidden">
      <Slider {...settings}>
        {foodlist
          .filter((item) => item.bestSeller)
          .map((item) => (
            <div key={item._id} className="px-2">
              <FoodCard item={item} popularDish={true} />
            </div>
          ))}
      </Slider>
    </div>
  );
}
