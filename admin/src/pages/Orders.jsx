import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PackageCheck } from "lucide-react";
import { StoreContext } from "../context/StoreContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "../components/InvoiceDocument";

const Orders = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Server error while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error updating order status");
    }
  };

  const markAsPaid = async (orderId) => {
    try {
      const response = await axios.post(
        `${url}/api/order/payment-status`,
        { orderId, paymentStatus: true },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Marked as paid");
        fetchAllOrders();
      } else {
        toast.error("Failed to mark as paid");
      }
    } catch (err) {
      toast.error("Server error while updating payment");
    }
  };

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
    } else {
      fetchAllOrders();
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10 text-gray-200">
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-3 md:grid-cols-5 gap-4 border border-orange-400 bg-slate-800 p-4 rounded-lg"
          >
            <div className="flex justify-center items-start mt-1">
              <PackageCheck className="text-orange-400" size={36} />
            </div>

            <div className="space-y-2 col-span-2">
              <p className="font-semibold text-sm">
                {order.items
                  .map((item) => `${item.name} x ${item.quantity}`)
                  .join(", ")}
              </p>

              <p className="font-semibold mt-1">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="text-sm space-y-1 text-gray-300">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country} - {order.address.zipcode}
                </p>
                <p className="text-xs">📞 {order.address.phone}</p>
              </div>

              {order.notes && (
                <p className="text-xs italic text-orange-300">
                  Note: {order.notes}
                </p>
              )}

              <p className="text-xs text-gray-400">
                Ordered on: {new Date(order.date).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col justify-start text-sm">
              <p className="mb-1">Items: {order.items.length}</p>
              <p className="text-green-400 font-semibold">₹{order.amount}</p>
              <p className="text-xs mt-1">
                Payment:{" "}
                <span
                  className={
                    order.paymentStatus ? "text-green-400" : "text-yellow-400"
                  }
                >
                  {order.paymentStatus ? "Paid" : "Pending"}
                </span>{" "}
                ({order.paymentMode})
              </p>

              {!order.paymentStatus && (
                <button
                  onClick={() => markAsPaid(order._id)}
                  className="mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Mark as Paid
                </button>
              )}

              <PDFDownloadLink
                document={<InvoiceDocument order={order} />}
                fileName={`invoice-${order._id}.pdf`}
                className="mt-2 text-blue-400 text-xs underline hover:text-blue-300"
              >
                {({ loading }) => (loading ? "Generating..." : "Download Invoice")}
              </PDFDownloadLink>
            </div>

            <div className="flex items-start">
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="bg-orange-100 text-black border border-orange-500 px-3 py-2 rounded text-sm focus:outline-none"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
