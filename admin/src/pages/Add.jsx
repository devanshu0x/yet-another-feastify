import React, { useState, useEffect, useContext } from "react";
import { CloudUpload } from "lucide-react";  // Importing Lucide icon
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Add = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    bestseller: false,
  });

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setData((data) => ({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("bestSeller", data.bestseller == true);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: { token },
    });
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
        bestseller: false,
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login with admin id first");
      navigate("/");
    }
  }, []);

  return (
    <div className="add w-3/4 mx-auto mt-12 text-gray-300 pb-18">
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <div className="add-img-upload flex-col items-center">
          <p>Upload image</p>
          <label htmlFor="image" className="cursor-pointer">
            <div className="w-28 h-28 flex justify-center items-center bg-slate-800 rounded-md text-violet-500">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Upload"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <CloudUpload size={24} /> // Lucide cloud upload icon
              )}
            </div>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
            className="px-4 py-2 rounded-md bg-slate-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
            className="px-4 py-2 rounded-md bg-slate-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          ></textarea>
        </div>

        <div className="add-category-price flex gap-8">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
              className="px-4 py-2 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹200"
              min={0}
              required
              className="px-4 py-2 rounded-md bg-slate-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <div className="add-bestseller flex items-center space-x-2">
          <input
            type="checkbox"
            name="bestseller"
            checked={data.bestseller}
            onChange={onChangeHandler}
            className="rounded-md text-violet-500 focus:ring-violet-500"
          />
          <p>Bestseller</p>
        </div>

        <button
          type="submit"
          className="add-btn px-6 py-2 rounded-md bg-violet-500 text-white cursor-pointer hover:bg-violet-600 focus:outline-none"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
