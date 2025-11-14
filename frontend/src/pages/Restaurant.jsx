import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRestaurant, fetchMenu } from "../api/restaurants.api.js";
import MenuItemCard from "../components/MenuItemCard";
import StarIcon from "@mui/icons-material/Star";

export default function Restaurant() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchRestaurant(id).then((res) => setRestaurant(res.data));
    fetchMenu(id).then((res) => setMenu(res.data.menu[0].items));
  }, [id]);

  if (!restaurant) return <div className="p-4">Loading...</div>;

  return (
    <div className="pb-20">
      
      {/* Header Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Restaurant Info */}
      <div className="p-4">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>

        <div className="flex items-center mt-1">
          <StarIcon className="text-yellow-500" />
          <span className="ml-1 font-semibold">{restaurant.rating}</span>
        </div>

        <p className="text-gray-500 mt-1">
          {restaurant.cuisines?.join(", ")}
        </p>

        <p className="text-sm text-gray-400 mt-1">{restaurant.address}</p>
      </div>

      {/* Divider */}
      <hr className="my-2" />

      {/* Menu Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <div className="space-y-3">
          {menu.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}
