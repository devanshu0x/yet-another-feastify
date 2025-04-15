import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const List = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching list");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(
      `${url}/api/food/remove`,
      { id: foodId },
      { headers: { token } }
    );
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error deleting item");
    }
  };

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
    } else {
      fetchList();
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4 text-gray-200 pb-18">
      <h2 className="text-xl font-semibold mb-4">All Food Items</h2>
      <div className="hidden md:grid grid-cols-5 gap-4 bg-slate-700 text-white font-semibold py-2 px-4 rounded">
        <div>Image</div>
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div>Action</div>
      </div>
      <div className="space-y-2">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 md:grid-cols-5 items-center gap-4 bg-slate-800 px-4 py-3 rounded hover:bg-slate-700 transition"
          >
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <p className="truncate">{item.name}</p>
            <p>{item.category}</p>
            <p className="text-green-400 font-medium">₹{item.price}</p>
            <button
              onClick={() => removeFood(item._id)}
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Remove"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
