import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-80 min-h-screen border-l border-r border-[#a9a9a9] border-t-0 text-[max(1vw,10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-3 py-2 rounded-l-md cursor-pointer font-medium ${
              isActive ? 'bg-[#f3e8ff] border-[#8b5cf6] text-[#8b5cf6]' : 'border-[#a9a9a9]'
            }`
          }
        >
          <p>Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-3 py-2 rounded-l-md cursor-pointer font-medium ${
              isActive ? 'bg-[#f3e8ff] border-[#8b5cf6] text-[#8b5cf6]' : 'border-[#a9a9a9]'
            }`
          }
        >
          <p>List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 px-3 py-2 rounded-l-md cursor-pointer font-medium ${
              isActive ? 'bg-[#f3e8ff] border-[#8b5cf6] text-[#8b5cf6]' : 'border-[#a9a9a9]'
            }`
          }
        >
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
