import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PackageCheck, RefreshCw } from "lucide-react";
import { StoreContext } from "../context/StoreContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "../components/InvoiceDocument";

const Orders = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [isPolling, setIsPolling] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(30000); // 30 seconds default
  const pollingRef = useRef(null);

  const fetchAllOrders = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Server error while fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = (interval) => {
    // Clear any existing interval first
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    
    // Start a new interval with the specified time
    const intervalToUse = interval || pollingInterval;
    pollingRef.current = setInterval(() => {
      fetchAllOrders();
    }, intervalToUse);
    
    setIsPolling(true);
  };

  const stopPolling = () => {
    setIsPolling(false);
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const togglePolling = () => {
    if (isPolling) {
      stopPolling();
    } else {
      startPolling();
    }
  };

  const changePollingInterval = (event) => {
    const newInterval = parseInt(event.target.value);
    
    // Stop current polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    
    // Update state with new interval
    setPollingInterval(newInterval);
    
    // If polling was active, restart it with new interval
    if (isPolling) {
      startPolling(newInterval);
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

  // Initial effect for setup
  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
    } else {
      fetchAllOrders();
      startPolling(); // Start with default interval
    }
    
    // Clean up on unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-100">Order Management</h2>
        <div className="flex items-center gap-3">
          <span className="bg-violet-400 text-black text-sm font-medium px-3 py-1 rounded-full">
            {orders.length} Orders
          </span>
          <button 
            onClick={() => fetchAllOrders()} 
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
            disabled={isLoading}
            title="Refresh now"
          >
            <RefreshCw 
              size={18} 
              className={`text-gray-300 ${isLoading ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>
      </div>
      
      <div className="bg-slate-800 p-4 rounded-lg mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Auto-refresh:</span>
          <button 
            onClick={togglePolling}
            className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${isPolling ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}
          >
            {isPolling ? 'On' : 'Off'}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Refresh every:</span>
          <select 
            value={pollingInterval} 
            onChange={changePollingInterval}
            className="bg-slate-700 text-white border border-slate-600 px-2 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <option value={5000}>5 seconds</option>
            <option value={15000}>15 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
            <option value={300000}>5 minutes</option>
          </select>
          
          {isPolling && (
            <div className="text-xs text-gray-400">
              Next refresh in: <span className="font-medium text-violet-400">
                {Math.ceil(pollingInterval/1000)}s
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-600 rounded-lg bg-slate-800/50">
            <PackageCheck className="text-gray-400 mb-3" size={48} />
            <p className="text-gray-400">No orders found</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-700 bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-violet-900/20 hover:shadow-xl"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Order Icon and Status */}
                  <div className="flex md:flex-col items-center md:items-start gap-3">
                    <div className="flex justify-center items-center bg-violet-400/10 p-3 rounded-lg">
                      <PackageCheck className="text-violet-400" size={28} />
                    </div>
                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="bg-slate-700 text-white border border-slate-600 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  {/* Order Details */}
                  <div className="flex-grow space-y-3">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {order.items.map((item, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center bg-slate-700 text-sm px-3 py-1 rounded-full"
                        >
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="p-3 bg-slate-700/50 rounded-lg space-y-1">
                      <h4 className="text-sm font-medium text-gray-300">Delivery Address</h4>
                      <p className="text-sm text-gray-400">{order.address.street}</p>
                      <p className="text-sm text-gray-400">{order.address.address}</p>
                      <p className="text-sm text-gray-400">📞 {order.phoneNumber}</p>
                    </div>

                    {order.notes && (
                      <div className="bg-violet-400/10 border-l-4 border-violet-400 p-3 rounded">
                        <p className="text-sm text-violet-300">
                          <span className="font-medium">Note:</span> {order.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div className="flex md:flex-col gap-4 md:min-w-40 bg-slate-900/50 p-4 rounded-lg">
                    <div className="space-y-2 flex-grow">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Order Total:</span>
                        <span className="text-lg font-bold text-green-400">₹{order.amount}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Items:</span>
                        <span className="text-sm">{order.items.length}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Payment:</span>
                        <span
                          className={`text-sm font-medium ${
                            order.paymentStatus ? "text-green-400" : "text-yellow-400"
                          }`}
                        >
                          {order.paymentStatus ? "Paid" : "Pending"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Method:</span>
                        <span className="text-sm">{order.paymentMode}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {!order.paymentStatus && (
                        <button
                          onClick={() => markAsPaid(order._id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          Mark as Paid
                        </button>
                      )}
                      
                      <PDFDownloadLink
                        document={<InvoiceDocument order={order} />}
                        fileName={`invoice-${order._id}.pdf`}
                        className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        {({ loading }) => (loading ? "Generating..." : "Download Invoice")}
                      </PDFDownloadLink>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 px-5 py-2 text-xs text-gray-400">
                Ordered on: {new Date(order.date).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;