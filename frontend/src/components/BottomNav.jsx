import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function BottomNav() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "text-red-500" : "text-gray-500";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-inner border-t border-gray-200 z-50">
      <ul className="flex justify-around py-2">

        <li className={`flex flex-col items-center ${active("/")}`}>
          <Link to="/">
            <HomeIcon fontSize="medium" />
            <span className="text-xs">Home</span>
          </Link>
        </li>

        <li className={`flex flex-col items-center ${active("/orders")}`}>
          <Link to="/orders">
            <RestaurantMenuIcon fontSize="medium" />
            <span className="text-xs">Orders</span>
          </Link>
        </li>

        <li className={`flex flex-col items-center ${active("/cart")}`}>
          <Link to="/cart">
            <ShoppingCartIcon fontSize="medium" />
            <span className="text-xs">Cart</span>
          </Link>
        </li>

        <li className={`flex flex-col items-center ${active("/profile")}`}>
          <Link to="/profile">
            <AccountCircleIcon fontSize="medium" />
            <span className="text-xs">Profile</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
}
