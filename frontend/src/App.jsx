import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Item from "./pages/Item";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import ItemDetails from "./pages/ItemDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div> {/* Add padding so bottom nav doesn't overlap */}
        <Navbar />
        <BottomNav />

        <div className="pt-16 pb-16">  {/* Add padding so top navbar doesn't overlap */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders/:order_id" element={<OrderDetails />} />
            <Route path="/item/:item_id" element={<ItemDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
