import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function MenuItemCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-start p-3 bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition"
         onClick={() => navigate(`/item/${item.id}`)}
    >
      {/* Left - Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover"
      />

      {/* Right - Details */}
      <div className="ml-3 flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        <p className="text-gray-600 mt-1 text-sm">
          {item.description}
        </p>

        <p className="text-gray-900 font-bold mt-2">₹ {item.price}</p>
      </div>

      {/* Add to cart */}
      <button className="ml-2 p-2 bg-red-500 text-white rounded-full">
        <AddIcon />
      </button>
    </div>
  );
}
