import { NavLink } from "react-router-dom";
import { UtensilsCrossed, CupSoda, ChevronDown } from "lucide-react";
import Features from "../components/Features";
import Carousel from "../components/Carousel";
import DiscountCoupon from "../components/DiscountCoupon";
import ContactUs from "../components/ContactUs";

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <section
        id="Hero"
        className="bg-neutral-900 text-white pt-36 pb-14 min-h-[70vh] flex items-center font-poppins"
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[40vw]">
            <h1 className="flex flex-col text-6xl font-bold leading-tight font-poppins">
              <span className="text-coquelicot">Delicious Food</span>
              <span>Delivered To</span>
              <span>Your Door</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 mt-4">
              Fast delivery, fresh ingredients, and your favorite local restaurants —
              all in one app. Order in just a few taps!
            </p>
            <div className="flex gap-8">
              <NavLink
                className="bg-coquelicot hover:bg-[#E55A29] py-3 px-5 font-normal rounded-4xl text-lg"
              >
                Download App
              </NavLink>
              <NavLink
                to="/menu"
                className="bg-transparent hover:bg-turquoise/20 border-2 text-turquoise py-3 px-6 font-normal rounded-4xl text-lg"
              >
                View Menu
              </NavLink>
            </div>
          </div>
          {/* OrderCard */}
          <div className="w-[80vw] md:w-lg h-120 relative">
            <div className="bg-turquoise/20 w-64 h-64 absolute -top-15 -right-15 rounded-full blur-3xl"></div>
            <div className="bg-coquelicot/20 w-64 h-64 absolute -bottom-15 -left-15 blur-3xl rounded-full"></div>
            <div className="w-full h-full">
              <div className="relative z-10 bg-neutral-800 w-full h-full p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-neutral-700 rounded-2xl p-4 w-full h-full -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-neutral-800 rounded-xl shadow-lg h-full w-full">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-bold text-lg">Your Order</h3>
                          <p className="text-gray-400 text-sm">#69786</p>
                        </div>
                        <div className="bg-turquoise/20 text-turquoise px-3 py-1 text-xs rounded-full font-bold">
                          On the way
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="mb-5 flex gap-3">
                          <div className="w-12 h-12 bg-coquelicot/20 rounded-lg flex items-center justify-center">
                            <UtensilsCrossed size={24} className="text-coquelicot" />
                          </div>
                          <div>
                            <p className="font-medium">Paneer Masala</p>
                            <p className="text-gray-400 text-sm">1 x ₹240</p>
                          </div>
                        </div>
                        <div className="mb-8 flex gap-3">
                          <div className="w-12 h-12 bg-turquoise/20 rounded-lg flex items-center justify-center">
                            <CupSoda size={24} className="text-turquoise" />
                          </div>
                          <div>
                            <p className="font-medium">Coke</p>
                            <p className="text-gray-400 text-sm">2 x ₹60</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between mb-2 text-gray-400 text-sm">
                            <p>Subtotal</p>
                            <p>₹360</p>
                          </div>
                          <div className="flex justify-between mb-2 text-gray-400 text-sm">
                            <p>Delivery</p>
                            <p>₹40</p>
                          </div>
                          <div className="flex justify-between mb-2 font-bold">
                            <p>Total</p>
                            <p>₹400</p>
                          </div>
                        </div>
                        <div>
                          <div className="bg-neutral-700 rounded-lg p-3 flex">
                            <div className="w-8 h-8 rounded-full bg-coquelicot/30"></div>
                            <div className="bg-neutral-500/20 mx-3 my-1 grow rounded-lg"></div>
                            <div className="w-8 h-8 rounded-full bg-turquoise/30"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Popular Dishes  */}
      <section className="py-4 mb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-neutral-800 font-poppins">
            Popular
            <span className="text-coquelicot"> Dishes</span>
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Discover top-rated restaurants in your area, with thousands of
            delicious options just a few taps away.
          </p>
        </div>

        {/* carousel */}
        <Carousel/>

        <div className="flex justify-center items-center mb-12">
          <NavLink
            to="/menu"
            className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-bold py-3 px-8 rounded-full transition duration-300 text-lg flex gap-2 items-center justify-center"
          >
            <div>Browse More Dishes</div>
            <div className="relative top-1">
              <ChevronDown size={20} className="text-neutral-800" />
            </div>
          </NavLink>
        </div>

        {/* Discount coupon */}
        <DiscountCoupon/>
      </div>
    </section>
     {/* Contact us  */}
     <ContactUs/>

    </div>
  );
}
