import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { ChevronDown, ChevronUp, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const { cartItem, addToCart, removeFromCart, deleteCartItem, foodlist, url } =
    useContext(StoreContext);
    
  const totalCost = Object.keys(cartItem).reduce((acc, id) => {
    const item = foodlist.find((food) => food._id === id);
    return item ? acc + item.price * cartItem[id] : acc;
  }, 0);
  
  if (totalCost === 0) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <ShoppingCart size={80} className="text-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <X size={40} className="text-[#ff6b35]" />
              </div>
            </div>
          </div>
          
          <div className="text-2xl md:text-3xl font-bold mb-3 text-neutral-800">
            Your Cart is <span className="text-[#ff6b35]">Empty</span>
          </div>
          
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
            Explore our menu to find delicious items!
          </p>
          
          <NavLink 
            to="/menu" 
            className="bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white font-medium py-3 px-8 rounded-lg transition duration-300 text-lg flex gap-2 items-center justify-center shadow-sm mx-auto w-full max-w-xs"
          >
            <ShoppingBag size={20} />
            <div>Browse Menu</div>
          </NavLink>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-800 text-center">
        Your <span className="text-[#ff6b35]">Cart</span>
      </h1>
      
      {/* Desktop table view - hidden on mobile */}
      <div className="hidden md:block mb-10">
        <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-[#2ec4b6]">
            <tr className="text-white font-medium">
              <th className="p-4 text-left">Food</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Total</th>
              <th className="p-4 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {foodlist
              .filter(
                (item) =>
                  !(cartItem[item._id] === undefined || cartItem[item._id] === 0)
              )
              .map((item) => {
                const total = item.price * cartItem[item._id];
                return (
                  <tr key={item._id} className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="flex justify-start items-center">
                        <img
                          src={url + "images/" + item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-center">₹{item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex gap-3 justify-center items-center">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <span className="w-6 text-center font-medium">{cartItem[item._id]}</span>
                        <button
                          onClick={() => addToCart(item._id)}
                          className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                        >
                          <ChevronUp size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center font-medium">₹{total.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteCartItem(item._id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      
      {/* Mobile card view - shown only on mobile */}
      <div className="md:hidden space-y-4 mb-10">
        {foodlist
          .filter(
            (item) =>
              !(cartItem[item._id] === undefined || cartItem[item._id] === 0)
          )
          .map((item) => {
            const total = item.price * cartItem[item._id];
            return (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={url + "images/" + item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => deleteCartItem(item._id)}
                    className="ml-auto text-red-500 hover:text-red-700 cursor-pointer p-1 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <span className="w-6 text-center font-medium">{cartItem[item._id]}</span>
                    <button
                      onClick={() => addToCart(item._id)}
                      className="p-1 border rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                  <div className="font-medium">
                    Total: ₹{total.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      
      {/* Cart summary */}
      <div className="mt-10 max-w-lg mx-auto">
        <div className="text-xl md:text-2xl font-medium text-neutral-800 mb-4">Order Summary</div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">₹50.00</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">₹{(totalCost * 0.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-[#ff6b35]">₹{(totalCost * 1.18 + 50).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="w-full py-3 px-4 bg-[#ff6b35] hover:bg-[#ff6b35]/90 rounded-lg text-white font-medium shadow-sm transition-colors duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}