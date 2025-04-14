import { Mail, Lock, User } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const { url, setToken } = useContext(StoreContext);
  const newUrl = url + "api/user/register";
  const navigate = useNavigate();
  const [data, setData] = useState(() => {
    return {
        name:"",
        email:"",
        password:""
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(newUrl, data);
      console.log(data);
      console.log(response.data)
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/", {
          state: { type: "success", message: "Registeration Successful!" },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Registeration failed! Please try again.");
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-900 text-white px-4 py-20">
      <div className="w-full max-w-md bg-neutral-800 rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-neutral-400 mb-8">
          Join the Feastify community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-neutral-300">
              Full Name
            </label>
            <div className="flex items-center border border-neutral-700 rounded-xl px-4 py-2 bg-neutral-700">
              <User className="w-5 h-5 text-turquoise" />
              <input
                type="text"
                placeholder="John Doe"
                value={data.name}
                onChange={(e)=>setData({...data,name:e.target.value})}
                className="ml-3 bg-transparent w-full outline-none text-white placeholder-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-neutral-300">
              Email
            </label>
            <div className="flex items-center border border-neutral-700 rounded-xl px-4 py-2 bg-neutral-700">
              <Mail className="w-5 h-5 text-turquoise" />
              <input
                type="email"
                value={data.email}
                onChange={(e)=>setData({...data,email:e.target.value})}
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
              <Lock className="w-5 h-5 text-turquoise" />
              <input
                type="password"
                value={data.password}
                onChange={(e)=>setData({...data,password:e.target.value})}
                placeholder="••••••••"
                className="ml-3 bg-transparent w-full outline-none text-white placeholder-neutral-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-turquoise text-white font-bold py-3 rounded-xl hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-turquoise font-semibold hover:underline"
          >
            Sign in here
          </NavLink>
        </p>
      </div>
    </section>
  );
}
