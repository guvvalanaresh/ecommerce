import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Navbar() {
  return (
    <header className="hidden md:flex items-center justify-between px-6 py-3 shadow bg-white fixed top-0 left-0 w-full z-50">

      {/* Left - Logo */}
      <Link to="/" className="text-2xl font-bold text-red-500">
        Food<span className="text-black">Hub</span>
      </Link>

      {/* Center - Menu Links */}
      <nav className="space-x-6 text-gray-700 font-semibold">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <Link to="/orders" className="hover:text-red-500">Orders</Link>
        <Link to="/profile" className="hover:text-red-500">Profile</Link>
        <Link to="/cart" className="hover:text-red-500">Cart</Link>
      </nav>

      {/* Right */}
      <div className="flex space-x-4">
        <MenuIcon className="cursor-pointer" />
        <AccountCircleIcon className="cursor-pointer" />
        <Link to="/cart">
          <ShoppingCartIcon className="cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}
