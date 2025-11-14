import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchItem, addToCart } from "../api/items.api.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Item() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItem(id).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <div className="p-4">Loading...</div>;

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await addToCart({
        restaurant_id: item.restaurantId,
        item_id: item.id,
        quantity: qty,
        modifiers: [],
        notes: "",
      });

      alert("Added to cart!");
      navigate("/cart");
    } catch (err) {
      alert("Failed to add item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24">

      {/* Top bar */}
      <div className="flex items-center p-4 shadow bg-white fixed top-0 w-full z-40">
        <ArrowBackIcon className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-lg font-semibold mx-auto">Item Details</h1>
        <div className="w-6" />
      </div>

      <div className="pt-16">

        {/* Image */}
        <div className="h-60 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Item Content */}
        <div className="p-4">
          <h2 className="text-2xl font-bold">{item.name}</h2>

          <p className="text-gray-500 mt-1">{item.description}</p>

          <p className="font-bold text-xl mt-3">₹ {item.price}</p>

          <span
            className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
              item.veg ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {item.veg ? "Veg" : "Non-Veg"}
          </span>

          {/* Nutrition */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg border">
            <h3 className="font-bold mb-2">Nutritional Info</h3>
            <p className="text-sm text-gray-600">Calories: {item.nutritional.calories}</p>
            <p className="text-sm text-gray-600">Protein: {item.nutritional.protein}g</p>
            <p className="text-sm text-gray-600">Carbs: {item.nutritional.carbs}g</p>
            <p className="text-sm text-gray-600">Fat: {item.nutritional.fat}g</p>
          </div>
        </div>
      </div>

      {/* Footer Add to Cart */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex items-center justify-between z-50">

        {/* Qty Selector */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <RemoveIcon />
          </button>

          <span className="text-lg font-bold">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="p-2 bg-gray-200 rounded-full"
          >
            <AddIcon />
          </button>
        </div>

        {/* Add Button */}
        <button
          disabled={loading}
          onClick={handleAddToCart}
          className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-red-600"
        >
          {loading ? "Adding..." : `Add • ₹ ${item.price * qty}`}
        </button>
      </div>
    </div>
  );
}
