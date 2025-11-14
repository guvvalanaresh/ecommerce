import { useEffect, useState } from "react";
import { getOrders } from "../api/orders.api.js";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getOrders();
    setOrders(res.data.data);
  };

  if (!orders) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no past orders.</p>
      ) : (
        orders.map((o) => (
          <Link
            key={o.id}
            to={`/orders/${o.id}`}
            className="block bg-white p-4 shadow rounded-lg mb-4 border hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Order #{o.id.slice(-6)}</h2>
              <span className="px-3 py-1 text-sm rounded bg-gray-200">
                {o.status}
              </span>
            </div>

            <p className="text-gray-600 mt-1 text-sm">
              {new Date(o.createdAt).toLocaleString()}
            </p>

            <p className="text-gray-800 mt-2 font-medium">
              Total: ₹{o.amounts.grand_total}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
