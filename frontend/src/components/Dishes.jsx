import { useContext, useState } from "react"
import FoodCard from "./FoodCard"
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

export default function Dishes({ category }) {
  const { foodlist } = useContext(StoreContext);
  
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-4">
      {
        foodlist.filter((li) => {
          return category === "All" || category === li.category
        }).map((li) => {
          return <FoodCard key={li._id} item={li} popularDish={false} />
        })
      }
    </div>
  )
}