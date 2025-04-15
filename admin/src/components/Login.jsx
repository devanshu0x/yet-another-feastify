import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ url }) => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post(url + "/api/user/login", data);
    if (response.data.success) {
      if (response.data.role === "admin") {
        setToken(response.data.token);
        setAdmin(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", true);
        toast.success("Login Successful");
        
      } else {
        toast.error("You are not an admin");
      }
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, [admin,token]);

  return (
    <div className="w-full min-h-screen flex items-start justify-center mt-16 px-4">
      <form
        onSubmit={onLogin}
        className="bg-white text-gray-700 border border-[#ff6b35] p-6 rounded-lg w-full max-w-sm shadow-md animate-fade-in"
      >
        <h2 className="text-xl font-semibold text-center text-black mb-4">Admin Login</h2>
        <div className="space-y-4">
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-[#ff6b35] text-white py-2 rounded hover:bg-[#e55d2d] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
