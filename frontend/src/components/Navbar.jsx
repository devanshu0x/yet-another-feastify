import { NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import {
  Menu as MenuIcon,
  Search,
  UserCircle,
  LogOut,
  ShoppingBag,
} from "lucide-react";

export default function Navbar() {
  const token = null; // Replace this with your auth state
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logging out...");
    // Your logout logic
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-white shadow-md">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <NavLink to="/" className="text-3xl font-extrabold text-primary">
          Feastify
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="px-4 py-1 rounded-2xl flex items-center gap-2 text-gray-400 hover:text-primary border border-gray-400 hover:border-primary cursor-pointer shadow-sm">
            <Search size={16} />
            <span>Search Menu</span>
          </div>

          <div className="flex items-center gap-6 text-gray-800">
            <NavLink to="/" className="hover:text-secondary">
              HOME
            </NavLink>
            <NavLink to="/menu" className="hover:text-secondary">
              MENU
            </NavLink>
            <NavLink to="/#ContactUs" className="hover:text-secondary">
              CONTACT US
            </NavLink>
            <NavLink to="/cart" className="hover:text-secondary">
              CART
            </NavLink>

            {!token ? (
              <NavLink to="/login" className="hover:text-secondary">
                SIGN IN
              </NavLink>
            ) : (
              <Menu as="div" className="relative">
                <MenuButton>
                  <UserCircle size={28} className="text-gray-700" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                  <div className="p-1">
                    <MenuItem>
                      {({ active }) => (
                        <div
                          className={`${
                            active ? "text-secondary" : "text-gray-700"
                          } flex items-center gap-2 p-2 cursor-pointer`}
                        >
                          <ShoppingBag size={18} />
                          My Orders
                        </div>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <div
                          onClick={logout}
                          className={`${
                            active ? "text-secondary" : "text-gray-700"
                          } flex items-center gap-2 p-2 cursor-pointer`}
                        >
                          <LogOut size={18} />
                          Log Out
                        </div>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Menu as="div" className="relative">
            <MenuButton>
              <MenuIcon size={28} className="text-primary" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
              <div className="p-2 space-y-2">
                <MenuItem>
                  <NavLink to="/" className="block hover:text-secondary">
                    HOME
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/menu" className="block hover:text-secondary">
                    MENU
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/#ContactUs" className="block hover:text-secondary">
                    CONTACT US
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/cart" className="block hover:text-secondary">
                    CART
                  </NavLink>
                </MenuItem>
                {!token ? (
                  <MenuItem>
                    <NavLink to="/login" className="block hover:text-secondary">
                      SIGN IN
                    </NavLink>
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem>
                      <div className="flex items-center gap-2 hover:text-secondary cursor-pointer">
                        <ShoppingBag size={18} />
                        My Orders
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        onClick={logout}
                        className="flex items-center gap-2 hover:text-secondary cursor-pointer"
                      >
                        <LogOut size={18} />
                        Log Out
                      </div>
                    </MenuItem>
                  </>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
