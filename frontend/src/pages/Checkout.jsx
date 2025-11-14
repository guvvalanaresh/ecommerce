import { useEffect, useState } from "react";
import { fetchAddresses, placeOrder } from "../api/checkout.api";
import { getCart } from "../api/cart.api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses().then((res) => {
      setAddresses(res.data);
      if (res.data.length > 0) {
        setSelectedAddress(res.data[0].id); // auto-select first address
      }
    });

    getCart().then((res) => setCart(res.data));
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Select an address first");

    try {
      setLoading(true);

      const res = await placeOrder({
        address_id: selectedAddress,
        payment_method: paymentMethod,
        delivery_instructions: instructions,
        schedule: null,
        use_wallet: false,
      });

      alert("Order placed!");
      navigate(`/orders`);
    } catch (err) {
      console.error(err);
      alert("Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <div className="p-4">Loading checkout...</div>;

  return (
    <div className="pb-24">

      {/* Header */}
      <div className="flex items-center p-4 shadow bg-white fixed top-0 w-full z-40">
        <ArrowBackIcon className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-semibold mx-auto">Checkout</h1>
        <div className="w-6" />
      </div>

      <div className="pt-16 p-4">

        {/* Delivery Address */}
        <h2 className="text-xl font-bold mb-3">Delivery Address</h2>

        {addresses.length === 0 && (
          <p className="text-gray-500">No address found. Please add one in Profile.</p>
        )}

        <div className="space-y-3">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className="flex items-start p-3 border rounded-lg cursor-pointer bg-white shadow-sm"
            >
              <input
                type="radio"
                checked={selectedAddress === addr.id}
                onChange={() => setSelectedAddress(addr.id)}
                className="mt-1"
              />

              <div className="ml-3">
                <p className="font-semibold">{addr.label || "Home"}</p>
                <p className="text-gray-600 text-sm">{addr.line1}</p>
                <p className="text-gray-500 text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Payment Method */}
        <h2 className="text-xl font-bold mt-6 mb-3">Payment Method</h2>

        <div className="space-y-3">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer bg-white shadow-sm">
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span className="ml-3 font-semibold">Cash on Delivery</span>
          </label>

          <label className="flex items-center p-3 border rounded-lg cursor-pointer bg-white shadow-sm">
            <input
              type="radio"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <span className="ml-3 font-semibold">Online Payment</span>
          </label>
        </div>

        {/* Delivery Instructions */}
        <h2 className="text-xl font-bold mt-6 mb-3">Delivery Instructions</h2>
        <textarea
          className="w-full border p-3 rounded-lg"
          placeholder="E.g., Leave at door, ring bell once..."
          rows={3}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        {/* Bill Summary */}
        <h2 className="text-xl font-bold mt-6 mb-3">Bill Details</h2>

        <div className="bg-white p-4 rounded-lg shadow-sm border space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {cart.subTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>₹ {cart.deliveryCharge}</span>
          </div>

          {cart.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹ {cart.discount}</span>
            </div>
          )}

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {cart.grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Footer: Place Order */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center z-50">
        <div className="font-bold text-xl">₹ {cart.grandTotal}</div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
