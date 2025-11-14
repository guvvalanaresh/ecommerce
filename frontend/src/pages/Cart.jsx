import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  clearCart,
} from "../api/cart.api.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = () =>
    getCart().then((res) => setCart(res.data));

  useEffect(() => {
    load();
  }, []);

  if (!cart)
    return <div className="p-4">Loading cart...</div>;

  const handleQtyChange = async (item, increase = true) => {
    const newQty = increase ? item.qty + 1 : item.qty - 1;
    if (newQty < 1) return;

    await updateCartItem(item.cart_item_id, {
      quantity: newQty,
    });

    load();
  };

  const handleRemove = async (id) => {
    await removeCartItem(id);
    load();
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return alert("Enter a coupon code");

    try {
      await applyCoupon(coupon);
      alert("Coupon applied!");
      load();
    } catch (err) {
      alert("Invalid or not applicable");
    }
  };

  const handleClear = async () => {
    await clearCart();
    load();
  };

  return (
    <div className="pb-24">

      {/* Header */}
      <div className="flex items-center p-4 shadow bg-white fixed top-0 w-full z-40">
        <ArrowBackIcon className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-semibold mx-auto">Your Cart</h1>
        <div className="w-6" />
      </div>

      <div className="pt-16 p-4">

        {/* Empty cart */}
        {cart.items.length === 0 && (
          <div className="text-center text-gray-500 text-lg mt-20">
            Your cart is empty.
          </div>
        )}

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.items.map((it) => (
            <div
              key={it.cart_item_id}
              className="flex items-start bg-white p-3 rounded-lg shadow-sm border"
            >
              <img
                src={it.image || "https://via.placeholder.com/100"}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="ml-3 flex-1">
                <h3 className="text-lg font-medium">{it.name}</h3>
                <p className="text-gray-600 text-sm">
                  ₹ {it.total_price}
                </p>

                {/* Qty */}
                <div className="flex items-center space-x-2 mt-3">
                  <button
                    className="p-1 bg-gray-200 rounded-full"
                    onClick={() => handleQtyChange(it, false)}
                  >
                    <RemoveIcon />
                  </button>

                  <span className="font-bold">{it.qty}</span>

                  <button
                    className="p-1 bg-gray-200 rounded-full"
                    onClick={() => handleQtyChange(it, true)}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>

              {/* Delete */}
              <button
                className="ml-2 p-2 bg-red-100 rounded-full text-red-500"
                onClick={() => handleRemove(it.cart_item_id)}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>

        {/* Coupon */}
        {cart.items.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Apply Coupon</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter coupon"
                className="border p-2 rounded flex-1"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Bill Details */}
        {cart.items.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2">Bill Details</h3>

            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹ {cart.subTotal}</span>
            </div>

            <div className="flex justify-between text-gray-700 mt-1">
              <span>Delivery Charge</span>
              <span>₹ {cart.deliveryCharge}</span>
            </div>

            {cart.discount > 0 && (
              <div className="flex justify-between text-green-600 mt-1">
                <span>Discount</span>
                <span>- ₹ {cart.discount}</span>
              </div>
            )}

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹ {cart.grandTotal}</span>
            </div>
          </div>
        )}

      </div>

      {/* Footer - Checkout */}
      {cart.items.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex items-center justify-between z-50">
          <div className="text-lg font-bold">
            ₹ {cart.grandTotal}
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

    </div>
  );
}
