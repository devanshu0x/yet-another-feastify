import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { token, admin, setAdmin, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-[4%] py-2 shadow-sm bg-slate-800">
      <span className="text-3xl font-bold text-violet-500">Feastify</span>
      {token && admin ? (
        <p
          className="text-xl text-gray-700 cursor-pointer hover:text-[#ff6b35] transition-colors"
          onClick={logout}
        >
          Logout
        </p>
      ) : (
        <p
          className="text-xl text-gray-700 cursor-pointer hover:text-[#ff6b35] transition-colors"
          onClick={() => navigate("/")}
        >
          Login
        </p>
      )}
    </div>
  );
};

export default Navbar;
