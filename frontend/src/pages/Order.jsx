import React, { useState, useContext, Fragment } from "react";
import { StoreContext } from "../context/StoreContext";
import {
  MapPin,
  Home,
  Building2,
  CreditCard,
  IndianRupee,
  ChevronDown,
  Phone,
  Check,
  ShoppingBag,
  Clock,
  Save,
} from "lucide-react";
import { Listbox, Transition, RadioGroup } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function OrderPage() {
  const navigate= useNavigate();
  const { cartItem, foodlist ,addressesList,saveAddress, placeOrder } = useContext(StoreContext);

  // Saved addresses
  const addresses= addressesList;

  // States
  const [selectedAddress, setSelectedAddress] = useState( ()=>{
    if(addresses.length){
      return addresses[0];
    }
    else{
      return {};
    }
  }
    
    
  );
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "home",
    title: "",
    address: "",
    saveAddress: true,
  });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [notes, setNotes] = useState("");
  const [isDineIn, setIsDineIn] = useState(false);
const [tableNumber, setTableNumber] = useState('');


  // Calculate total cost
  const subtotal = Object.keys(cartItem).reduce((acc, id) => {
    const item = foodlist.find((food) => food._id === id);
    return item ? acc + item.price * cartItem[id] : acc;
  }, 0);

  const deliveryFee = 50;
  const gst = subtotal * 0.18;
  const totalCost = subtotal + deliveryFee + gst;

  // Address type options
  const addressTypes = [
    { id: "home", name: "Home", icon: Home },
    { id: "work", name: "Work", icon: Building2 },
    { id: "other", name: "Other", icon: MapPin },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // This would typically send data to your backend
    const orderData={
      address: useNewAddress ? newAddress : selectedAddress,
      paymentMode:paymentMethod,
      phoneNumber,
      notes,
      amount: totalCost,
      isDineIn,
      tableNumber
    };


    // If saving new address
    if (useNewAddress && newAddress.saveAddress) {
      const newSavedAddress = {
        type: newAddress.type,
        title:
          newAddress.title ||
          (newAddress.type === "home"
            ? "Home"
            : newAddress.type === "work"
            ? "Office"
            : "Other"),
        address: newAddress.address,
      };
      saveAddress(newSavedAddress);
      // setAddresses([...addresses, newSavedAddress]);
    }

    // Navigate to order confirmation page or show success message
    if(placeOrder(orderData)){
      navigate("/order/success");
    }
    else{
      toast.error("Failed to place order");
    }
  };

  // Cart items component
  const CartItems = () => (
    <div className="space-y-4 mb-6">
      {foodlist
        .filter((item) => cartItem[item._id] && cartItem[item._id] > 0)
        .map((item) => {
          const quantity = cartItem[item._id];
          const itemTotal = item.price * quantity;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between py-2 border-b border-neutral-700"
            >
              <div className="flex items-center">
                <div className="bg-neutral-700 text-neutral-100 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">
                  {quantity}
                </div>
                <div>
                  <p className="text-neutral-100 font-medium">{item.name}</p>
                  <p className="text-neutral-400 text-sm">
                    ₹{item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
              <div className="text-[#ff6b35] font-medium">
                ₹{itemTotal.toFixed(2)}
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="bg-neutral-900 min-h-screen py-18 px-4 md:py-20">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-100 text-center">
          Checkout <span className="text-[#ff6b35]">Order</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Order form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Delivery Method Toggle */}
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
                <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                  <MapPin className="mr-2 text-[#ff6b35]" size={20} />
                  Order Type
                </h2>

                <div className="flex items-center space-x-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setIsDineIn(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                      !isDineIn
                        ? "bg-[#ff6b35] text-white font-medium"
                        : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDineIn(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                      isDineIn
                        ? "bg-[#ff6b35] text-white font-medium"
                        : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                    }`}
                  >
                    Dine In
                  </button>
                </div>

                {isDineIn ? (
                  <div className="space-y-4">
                    <label
                      htmlFor="tableNumber"
                      className="block text-neutral-300 text-sm mb-1"
                    >
                      Table Number
                    </label>
                    <input
                      id="tableNumber"
                      type="text"
                      placeholder="Enter your table number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                    />
                  </div>
                ) : (
                  <>
                    {/* Delivery Address Section */}
                    <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
                      <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                        <MapPin className="mr-2 text-[#ff6b35]" size={20} />
                        Delivery Address
                      </h2>

                      {/* Address Selection Toggle */}
                      <div className="flex items-center space-x-4 mb-6">
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(false)}
                          className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                            !useNewAddress
                              ? "bg-[#ff6b35] text-white font-medium"
                              : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                          }`}
                        >
                          Saved Addresses
                        </button>
                        <button
                          type="button"
                          onClick={() => setUseNewAddress(true)}
                          className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                            useNewAddress
                              ? "bg-[#ff6b35] text-white font-medium"
                              : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                          }`}
                        >
                          New Address
                        </button>
                      </div>

                      {!useNewAddress ? (
                        /* Saved Addresses */
                        <div className="space-y-4">
                          <Listbox
                            value={selectedAddress}
                            onChange={setSelectedAddress}
                          >
                            <div className="relative">
                              <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-neutral-700 rounded-lg border border-neutral-600 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]">
                                <div className="flex items-center">
                                  {selectedAddress.type === "home" && (
                                    <Home
                                      size={18}
                                      className="mr-2 text-neutral-400"
                                    />
                                  )}
                                  {selectedAddress.type === "work" && (
                                    <Building2
                                      size={18}
                                      className="mr-2 text-neutral-400"
                                    />
                                  )}
                                  {selectedAddress.type === "other" && (
                                    <MapPin
                                      size={18}
                                      className="mr-2 text-neutral-400"
                                    />
                                  )}
                                  <span className="block truncate text-neutral-100">
                                    {selectedAddress.title}
                                  </span>
                                </div>
                                <span className="text-sm text-neutral-400 mt-1 block">
                                  {selectedAddress.address}
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDown
                                    className="h-5 w-5 text-neutral-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none py-1 border border-neutral-700">
                                  {addresses.map((address) => (
                                    <Listbox.Option
                                      key={address.id}
                                      className={({ active }) =>
                                        `${active ? "bg-neutral-700" : ""}
                                  cursor-pointer select-none relative py-3 pl-4 pr-4`
                                      }
                                      value={address}
                                    >
                                      {({ selected, active }) => (
                                        <>
                                          <div className="flex items-center">
                                            {address.type === "home" && (
                                              <Home
                                                size={18}
                                                className="mr-2 text-neutral-400"
                                              />
                                            )}
                                            {address.type === "work" && (
                                              <Building2
                                                size={18}
                                                className="mr-2 text-neutral-400"
                                              />
                                            )}
                                            {address.type === "other" && (
                                              <MapPin
                                                size={18}
                                                className="mr-2 text-neutral-400"
                                              />
                                            )}
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? "font-medium text-neutral-100"
                                                  : "text-neutral-300"
                                              }`}
                                            >
                                              {address.title}
                                            </span>
                                          </div>
                                          <span className="text-sm text-neutral-400 mt-1 block">
                                            {address.address}
                                          </span>
                                          {selected && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#ff6b35]">
                                              <Check
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                      ) : (
                        /* New Address Form */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-neutral-300 mb-2 text-sm">
                              Address Type
                            </label>
                            <RadioGroup
                              value={newAddress.type}
                              onChange={(value) =>
                                setNewAddress({ ...newAddress, type: value })
                              }
                            >
                              <div className="flex space-x-4">
                                {addressTypes.map((type) => (
                                  <RadioGroup.Option
                                    key={type.id}
                                    value={type.id}
                                    className={({ checked }) => `
                                flex-1 relative rounded-lg shadow-md px-4 py-3 cursor-pointer
                                ${
                                  checked
                                    ? "bg-neutral-700 border-2 border-[#ff6b35]"
                                    : "bg-neutral-700 border border-neutral-600"
                                }
                              `}
                                  >
                                    {({ checked }) => (
                                      <div className="flex items-center justify-center">
                                        <type.icon
                                          size={18}
                                          className={
                                            checked
                                              ? "text-[#ff6b35] mr-2"
                                              : "text-neutral-400 mr-2"
                                          }
                                        />
                                        <RadioGroup.Label
                                          as="p"
                                          className={`font-medium ${
                                            checked
                                              ? "text-neutral-100"
                                              : "text-neutral-300"
                                          }`}
                                        >
                                          {type.name}
                                        </RadioGroup.Label>
                                      </div>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <label
                              htmlFor="addressTitle"
                              className="block text-neutral-300 mb-1 text-sm"
                            >
                              Address Title
                            </label>
                            <input
                              type="text"
                              id="addressTitle"
                              placeholder="E.g. Home, Office, Mom's Place"
                              className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                              value={newAddress.title}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="fullAddress"
                              className="block text-neutral-300 mb-1 text-sm"
                            >
                              Full Address
                            </label>
                            <textarea
                              id="fullAddress"
                              rows={3}
                              placeholder="Enter your complete address with landmark"
                              className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                              value={newAddress.address}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  address: e.target.value,
                                })
                              }
                              required={useNewAddress}
                            />
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="saveAddress"
                              className="h-4 w-4 text-[#ff6b35] rounded border-neutral-500 focus:ring-[#ff6b35] bg-neutral-700"
                              checked={newAddress.saveAddress}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  saveAddress: e.target.checked,
                                })
                              }
                            />
                            <label
                              htmlFor="saveAddress"
                              className="ml-2 text-neutral-300 text-sm"
                            >
                              Save this address for future orders
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
                <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                  <Phone className="mr-2 text-[#ff6b35]" size={20} />
                  Contact Information
                </h2>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-neutral-300 mb-1 text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter your 10-digit phone number"
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    pattern="[0-9]{10}"
                    required
                  />
                  <p className="text-neutral-400 text-xs mt-1">
                    We'll send delivery updates on this number
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
                <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                  <CreditCard className="mr-2 text-[#ff6b35]" size={20} />
                  Payment Method
                </h2>

                <RadioGroup
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <RadioGroup.Option
                    value="upi"
                    className={({ checked }) => `
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer
                    ${
                      checked
                        ? "bg-neutral-700 border-2 border-[#ff6b35]"
                        : "bg-neutral-700 border border-neutral-600"
                    }
                  `}
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`rounded-full h-5 w-5 flex items-center justify-center border ${
                                checked
                                  ? "border-[#ff6b35]"
                                  : "border-neutral-400"
                              }`}
                            >
                              {checked && (
                                <div className="rounded-full h-3 w-3 bg-[#ff6b35]" />
                              )}
                            </div>
                            <RadioGroup.Label
                              as="p"
                              className={`ml-3 font-medium ${
                                checked
                                  ? "text-neutral-100"
                                  : "text-neutral-300"
                              }`}
                            >
                              UPI Payment
                            </RadioGroup.Label>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-neutral-400">
                              Google Pay, PhonePe, Paytm
                            </span>
                          </div>
                        </div>

                        {checked && (
                          <div className="mt-4">
                            <label
                              htmlFor="upiId"
                              className="block text-neutral-300 mb-1 text-sm"
                            >
                              UPI ID
                            </label>
                            <input
                              type="text"
                              id="upiId"
                              placeholder="username@upi"
                              className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              required={paymentMethod === "upi"}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option
                    value="cod"
                    className={({ checked }) => `
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer
                    ${
                      checked
                        ? "bg-neutral-700 border-2 border-[#ff6b35]"
                        : "bg-neutral-700 border border-neutral-600"
                    }
                  `}
                  >
                    {({ checked }) => (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`rounded-full h-5 w-5 flex items-center justify-center border ${
                              checked
                                ? "border-[#ff6b35]"
                                : "border-neutral-400"
                            }`}
                          >
                            {checked && (
                              <div className="rounded-full h-3 w-3 bg-[#ff6b35]" />
                            )}
                          </div>
                          <RadioGroup.Label
                            as="p"
                            className={`ml-3 font-medium ${
                              checked ? "text-neutral-100" : "text-neutral-300"
                            }`}
                          >
                            Cash on Delivery
                          </RadioGroup.Label>
                        </div>
                        <div className="flex items-center">
                          <IndianRupee size={16} className="text-neutral-400" />
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
                <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                  <Clock className="mr-2 text-[#ff6b35]" size={20} />
                  Delivery Instructions (Optional)
                </h2>

                <div>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Any specific instructions for delivery? (E.g. Ring the bell twice, Leave at the door)"
                    className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Mobile Submit Button (shown only on small screens) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#ff6b35] hover:bg-[#ff6b35]/90 rounded-lg text-white font-medium shadow-md transition-colors duration-300 flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Place Order - ₹{totalCost.toFixed(2)}
                </button>
              </div>
            </form>
          </div>

          {/* Right column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-800 rounded-lg shadow-lg border border-neutral-700 sticky top-6">
              <div className="p-6 border-b border-neutral-700">
                <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                  <ShoppingBag className="mr-2 text-[#ff6b35]" size={20} />
                  Order Summary
                </h2>

                {/* Cart Items */}
                <CartItems />

                {/* Order Totals */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-300">Subtotal</span>
                    <span className="text-neutral-100">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-300">Delivery Fee</span>
                    <span className="text-neutral-100">
                      ₹{deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-300">GST (18%)</span>
                    <span className="text-neutral-100">₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-neutral-700 font-medium">
                    <span className="text-neutral-100">Total</span>
                    <span className="text-[#ff6b35]">
                      ₹{totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="p-6 border-b border-neutral-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-300">
                    Estimated Delivery
                  </div>
                  <div className="text-neutral-100 font-medium">30-45 mins</div>
                </div>
              </div>

              {/* Desktop Submit Button (hidden on small screens) */}
              <div className="p-6 hidden lg:block">
                <button
                  type="submit"
                  form="orderForm"
                  className="w-full py-4 bg-[#ff6b35] hover:bg-[#ff6b35]/90 rounded-lg text-white font-medium shadow-md transition-colors duration-300 flex items-center justify-center"
                  onClick={handleSubmit}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Place Order
                </button>

                <p className="text-center text-neutral-400 text-xs mt-3">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
