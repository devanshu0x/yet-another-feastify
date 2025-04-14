import { Star } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

function descriptionParse(desc, wordCount = 10) {
  const wordArr = desc.split(/\s+/);
  if (wordArr.length <= wordCount) {
    return wordArr.slice(0, wordCount).join(" ");
  } else {
    return wordArr.slice(0, wordCount).join(" ") + "...";
  }
}

// if called with popularDish=true then will display bestseller tag
export default function FoodCard({ item, popularDish }) {
  const { addToCart, cartItem, token, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (!token) {
      navigate("/login", { state: { error: "You Need to Sign In first" } });
    } else {
      if (cartItem[item._id] === undefined || cartItem[item._id] === 0) {
        addToCart(item._id);
        toast.success("Added to Cart");
      } else {
        navigate("/cart");
      }
    }
  };

  return (
    <div>
      <div className="rounded-2xl shadow-sm w-78 hover:scale-101 hover:z-100 my-4">
        <div className="h-98 bg-white relative rounded-2xl">
          <img src={url + "images/" + item.image} className="h-48 w-78 rounded-t-2xl" />
          <div className="absolute top-3 left-0 right-0 px-6 flex justify-between items-center">
            <div className="flex gap-1 justify-center items-center text-[#ff6b35] text-sm bg-white px-4 py-1 rounded-full shadow-lg">
              <Star size={16} className="text-[#ff6b35]" />
              <div>{item.rating}</div>
            </div>
            {popularDish === true && (
              <div className="text-sm bg-[#2ec4b6] text-white font-bold px-3 py-1 rounded-full">
                Best Seller
              </div>
            )}
          </div>
          <div className="p-6 pt-4">
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-neutral-600 text-sm mb-2">
              {descriptionParse(item.description)}
            </p>
            <div className="px-0 flex justify-between items-center">
              <p className="text-[#ff6b35] font-bold border border-[#ff6b35] px-6 py-1 rounded-full">
                ₹{item.price}/-
              </p>
              <div className="text-xs font-bold text-[#2ec4b6] bg-[#2ec4b6]/10 px-4 py-1 rounded-full">
                Servings: {item.servings}
              </div>
            </div>
            <div
              className={`mt-3 text-center px-4 py-2 rounded-lg cursor-pointer text-white font-bold ${
                cartItem[item._id] === undefined || cartItem[item._id] === 0
                  ? "bg-[#ff6b35]"
                  : "bg-[#2ec4b6]"
              }`}
              onClick={addToCartHandler}
            >
              {cartItem[item._id] === undefined || cartItem[item._id] === 0
                ? "Add to Cart"
                : "View Cart"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
