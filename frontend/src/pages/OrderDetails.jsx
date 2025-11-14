import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails, cancelOrder } from "../api/orders.api.js";

export default function OrderDetails() {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [cancelMsg, setCancelMsg] = useState("");

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const res = await getOrderDetails(order_id);
    setOrder(res.data);
  };

  const handleCancel = async () => {
    const res = await cancelOrder(order_id, "Changed my mind");
    setCancelMsg("Order Cancelled");
    loadOrder();
  };

  if (!order) return <p className="p-6">Loading order...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Order Status */}
      <div className="bg-white p-4 rounded shadow mb-5">
        <p className="text-lg font-semibold flex justify-between">
          Status: <span className="text-blue-600">{order.status}</span>
        </p>
        <p className="text-gray-500 text-sm">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Items */}
      <div className="bg-white p-4 rounded shadow mb-5">
        <h2 className="font-semibold mb-3 text-lg">Items</h2>

        {order.items.map((item) => (
          <div key={item.item_id} className="border-b py-2">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">
              Qty: {item.qty} • ₹{item.total_price}
            </p>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="bg-white p-4 rounded shadow mb-5">
        <h2 className="font-semibold mb-3 text-lg">Price Details</h2>

        <p className="flex justify-between text-sm">
          <span>Subtotal:</span> <span>₹{order.amounts.sub_total}</span>
        </p>
        <p className="flex justify-between text-sm">
          <span>Delivery:</span> <span>₹{order.amounts.delivery_charge}</span>
        </p>
        <p className="flex justify-between text-sm">
          <span>Discount:</span> <span>₹{order.amounts.discount}</span>
        </p>

        <p className="flex justify-between font-bold mt-2 text-lg">
          <span>Total:</span> <span>₹{order.amounts.grand_total}</span>
        </p>
      </div>

      {/* Cancel Button */}
      {order.status === "pending" || order.status === "confirmed" ? (
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white w-full py-3 rounded-lg font-semibold"
        >
          Cancel Order
        </button>
      ) : null}

      {cancelMsg && (
        <p className="text-center text-green-600 font-semibold mt-3">
          {cancelMsg}
        </p>
      )}
    </div>
  );
}
