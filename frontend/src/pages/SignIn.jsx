import { Mail, Lock } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function SignIn() {
  const [data, setData] = useState(() => {
    return {
      email: "",
      password: "",
    };
  });
  const navigate = useNavigate();
  const { url, setToken } = useContext(StoreContext);
  const newUrl = url + "api/user/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed! Please try again.");
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4 py-12">
      <div className="w-full max-w-md bg-neutral-800 rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-neutral-400 mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-neutral-300">
              Email
            </label>
            <div className="flex items-center border border-neutral-700 rounded-xl px-4 py-2 bg-neutral-700">
              <Mail className="w-5 h-5 text-coquelicot" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="you@example.com"
                className="ml-3 bg-transparent w-full outline-none text-white placeholder-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-neutral-300">
              Password
            </label>
            <div className="flex items-center border border-neutral-700 rounded-xl px-4 py-2 bg-neutral-700">
              <Lock className="w-5 h-5 text-coquelicot" />
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="••••••••"
                className="ml-3 bg-transparent w-full outline-none text-white placeholder-neutral-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-coquelicot text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-coquelicot font-semibold hover:underline"
          >
            Sign up here
          </NavLink>
        </p>
      </div>
    </section>
  );
}
