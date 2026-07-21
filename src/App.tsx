import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import LoginPopup from "./components/login-popup/LoginPopup";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import MyOrders from "./pages/myOrders/MyOrders";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Verify from "./pages/verify/Verify";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
