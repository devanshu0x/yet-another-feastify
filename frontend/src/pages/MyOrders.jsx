import { Disclosure } from '@headlessui/react';
import { ChevronUp, ChevronDown, Clock4, Truck, BadgeCheck } from 'lucide-react';

const MyOrder = () => {
  const order = {
    id: 'ORD123456',
    status: 'Preparing',
    method: 'Delivery', // or 'Dine-in'
    table: null,
    items: [
      { name: 'Margherita Pizza', qty: 2, price: 8.99 },
      { name: 'Garlic Bread', qty: 1, price: 3.49 },
      { name: 'Coke', qty: 2, price: 1.99 },
    ],
  };

  const total = order.items.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="p-4 py-24 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-[--color-coquelicot]">My Orders</h1>

      <Disclosure>
        {({ open }) => (
          <div className="bg-white shadow-md rounded-2xl mb-4">
            <Disclosure.Button className="w-full flex justify-between items-center px-4 py-3 text-left">
              <div>
                <div className="text-sm text-gray-500">Order ID: <span className="text-black font-medium">{order.id}</span></div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock4 className="w-4 h-4 text-[--color-coquelicot]" />
                  <span className="text-[--color-coquelicot] font-semibold">{order.status}</span>
                </div>
              </div>
              {open ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </Disclosure.Button>

            <Disclosure.Panel className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-3">
                {order.method === 'Delivery' ? (
                  <>
                    <Truck className="w-5 h-5 text-[--color-coquelicot]" />
                    <span className="text-gray-800">Delivery</span>
                  </>
                ) : (
                  <>
                    <BadgeCheck className="w-5 h-5 text-[--color-coquelicot]" />
                    <span className="text-gray-800">Dine-in (Table #{order.table})</span>
                  </>
                )}
              </div>

              <div className="divide-y">
                {order.items.map((item, index) => (
                  <div key={index} className="py-3 flex justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.qty}</div>
                    </div>
                    <div className="text-gray-800 font-semibold">${(item.qty * item.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default MyOrder;
