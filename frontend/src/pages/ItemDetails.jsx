import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemDetails } from "../api/item.api";
import { addToCart } from "../api/cart.api.js";

export default function ItemDetails() {
  const { item_id } = useParams();
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const res = await getItemDetails(item_id);
    setItem(res.data);
  };

  const addItemToCart = async () => {
    const payload = {
      item_id: item.id,
      restaurant_id: item.restaurantId,
      quantity: qty,
      notes
    };

    await addToCart(payload);
    setMsg("Item added to cart!");
  };

  if (!item) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-4 pb-20">

      {/* Item Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden shadow">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Item Title */}
      <h1 className="text-2xl font-bold mt-4">{item.name}</h1>

      {/* Veg/Non-Veg */}
      <p className={`mt-1 font-medium ${item.veg ? "text-green-600" : "text-red-600"}`}>
        {item.veg ? "Veg" : "Non-Veg"}
      </p>

      {/* Price */}
      <p className="text-xl font-semibold mt-2">₹{item.price}</p>

      {/* Description */}
      <p className="text-gray-700 mt-3">{item.description}</p>

      {/* Nutrition */}
      <div className="mt-5 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Nutritional Info</h2>

        <p className="text-sm text-gray-600">Calories: {item.nutritional.calories}</p>
        <p className="text-sm text-gray-600">Protein: {item.nutritional.protein}g</p>
        <p className="text-sm text-gray-600">Carbs: {item.nutritional.carbs}g</p>
        <p className="text-sm text-gray-600">Fat: {item.nutritional.fat}g</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mt-6 gap-4">
        <button
          onClick={() => qty > 1 && setQty(qty - 1)}
          className="w-10 h-10 text-xl bg-gray-200 rounded"
        >
          -
        </button>

        <span className="text-xl font-bold">{qty}</span>

        <button
          onClick={() => setQty(qty + 1)}
          className="w-10 h-10 text-xl bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      {/* Notes */}
      <textarea
        placeholder="Any notes? (e.g., Extra spicy, no onion...)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border rounded w-full p-2 mt-5"
        rows="2"
      />

      {/* Add to Cart Button */}
      <button
        onClick={addItemToCart}
        className="mt-6 bg-orange-600 text-white w-full py-3 rounded-lg font-bold"
      >
        Add for ₹{item.price * qty}
      </button>

      {msg && (
        <p className="text-green-600 text-center mt-3 font-semibold">
          {msg}
        </p>
      )}
    </div>
  );
}
