import { menu_list } from "../assets/assets";

export default function Category({ category, setCategory }) {
  return (
    <>
      {/* Flex layout for mobile and small/medium screens */}
      <div className="flex flex-wrap justify-center sm:justify-evenly items-center px-2 lg:hidden">
        {menu_list.map((li) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === li.menu_name ? "All" : li.menu_name
                )
              }
              key={li.id}
              className="m-2 sm:m-3 md:m-4 flex flex-col items-center justify-between"
            >
              <img
                className={`mb-2 md:mb-4 w-20 sm:w-24 md:w-32 cursor-pointer rounded-full ${
                  category === li.menu_name ? "p-0.5 border-4 border-[#ff6b35]" : ""
                }`}
                src={li.menu_image}
                alt={li.menu_name}
              />
              <p className="text-neutral-800 text-sm sm:text-base mb-1 md:mb-2">{li.menu_name}</p>
            </div>
          );
        })}
      </div>
      
      {/* Grid layout for large screens and up */}
      <div className="hidden lg:grid grid-cols-5 xl:grid-cols-6 gap-6 px-4 py-4">
        {menu_list.map((li) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === li.menu_name ? "All" : li.menu_name
                )
              }
              key={li.id}
              className="flex flex-col items-center justify-between"
            >
              <img
                className={`mb-3 w-28 cursor-pointer rounded-full ${
                  category === li.menu_name ? "p-0.5 border-4 border-[#ff6b35]" : ""
                }`}
                src={li.menu_image}
                alt={li.menu_name}
              />
              <p className="text-neutral-800 text-base">{li.menu_name}</p>
            </div>
          );
        })}
      </div>
      
      <hr className="text-gray-300 mt-2 md:mt-4" />
    </>
  );
}