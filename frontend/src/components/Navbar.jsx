import { NavLink, useNavigate } from "react-router-dom";
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem, DisclosureButton,DisclosurePanel } from "@headlessui/react";
import { Menu as MenuIcon, UserCircle, LogOut, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const token = null; // Replace with your auth state
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    // Your logout logic here
  };

  return (
    <Disclosure as="nav" className="w-full fixed top-0 z-50 bg-white shadow-md font-poppins h-16">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
            {/* Left: Logo */}
            <NavLink to="/" className="text-3xl font-extrabold text-[#E66E43]">
              Feastify
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:items-center md:space-x-8 font-openSans">
              <NavLink to="/" className="hover:text-coquelicot">
                HOME
              </NavLink>
              <NavLink to="/menu" className="hover:text-coquelicot">
                MENU
              </NavLink>
              <NavLink to="/#ContactUs" className="hover:text-coquelicot">
                CONTACT US
              </NavLink>
              <NavLink to="/cart" className="hover:text-coquelicot">
                CART
              </NavLink>
              {!token ? (
                <NavLink to="/login" className="hover:text-coquelicot">
                  SIGN IN
                </NavLink>
              ) : (
                <Menu as="div" className="relative">
                  <MenuButton className="flex items-center">
                    <UserCircle size={24} className="text-3xl" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <MenuItem as="div">
                      {({ active }) => (
                        <button
                          onClick={() => navigate("/orders")}
                          className={`${active ? "bg-gray-100 text-coquelicot" : "text-gray-700"} flex items-center gap-3 w-full px-4 py-2 text-sm font-openSans`}
                        >
                          <ShoppingBag size={16} />
                          My Orders
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem as="div">
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${active ? "bg-gray-100 text-coquelicot" : "text-gray-700"} flex items-center gap-3 w-full px-4 py-2 text-sm font-openSans`}
                        >
                          <LogOut size={16} />
                          Log Out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <DisclosureButton className="p-2 rounded-md text-gray-400 hover:text-coquelicot focus:outline-none">
                <MenuIcon size={24} />
              </DisclosureButton>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <DisclosurePanel className="md:hidden bg-white border-b-1 border-neutral-300 ">
            <div className="px-2 pt-2 pb-3 space-y-1 font-openSans">
              <NavLink
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-coquelicot"
              >
                HOME
              </NavLink>
              <NavLink
                to="/menu"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-coquelicot"
              >
                MENU
              </NavLink>
              <NavLink
                to="/#ContactUs"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-coquelicot"
              >
                CONTACT US
              </NavLink>
              <NavLink
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-coquelicot"
              >
                CART
              </NavLink>
              {!token ? (
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:text-coquelicot"
                >
                  SIGN IN
                </NavLink>
              ) : (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-coquelicot"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    My Orders
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-coquelicot"
                  >
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
