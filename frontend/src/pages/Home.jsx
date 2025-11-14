import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurants.api";
import RestaurantCard from "../components/RestaurantCard";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants().then(res => {
      setRestaurants(res.data.data);
    });
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {restaurants.map(r => (
        <RestaurantCard key={r.id} data={r} />
      ))}
    </div>
  );
}
