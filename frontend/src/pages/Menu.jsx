import { useState } from "react";
import Category from "../components/Category";
import ScrollToTop from "../scroll/ScrollToTop";
import Dishes from "../components/Dishes";

export default function Menu() {
  const [category, setCategory] = useState("All");

  return (
    <div className="mt-20 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <ScrollToTop/>

      {/* Heading */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 py-6 font-bold text-3xl sm:text-4xl text-neutral-800 text-center">
        Explore Our <span className="text-coquelicot">Menu</span>
      </div>

      {/* Category Tabs */}
      <Category category={category} setCategory={setCategory} />

      {/* Dishes Grid */}
      <Dishes category={category} />
    </div>
  );
}
