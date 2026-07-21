import {
  CircleUserRound,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { selectTotalCartAmount } from "../../store/slices/cartSlice";

interface NavbarProps {
  setShowLogin: (value: boolean) => void;
}

export default function Navbar({ setShowLogin }: NavbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from Redux store
  const token = useAppSelector((state) => state.auth.token);
  const totalCartAmount = useAppSelector(selectTotalCartAmount);

  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "categories", label: "Categories", href: "#explore-category" },
    { id: "mobile app", label: "Mobile App", href: "#app-download" },
    { id: "contact us", label: "Contact Us", href: "#footer" },
  ];

  // Smooth scroll function
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      setIsMenuOpen(false);
      return;
    }
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMenuOpen(false);
  };

  // Logout handler
  const handleLogout = () => {
    dispatch(logout()); // Now handles localStorage automatically
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="py-5 flex justify-between items-center relative bg-white">
      {/* Logo */}
      <Link to="/">
        <div className="text-2xl sm:text-3xl text-[#74d4ff] hover:text-red-800 transition font-extrabold">
          GH
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex list-none gap-5 text-[#49557e] text-[18px]">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              handleScroll(e, item.href);
              setMenu(item.id);
            }}
            className={
              menu === item.id
                ? "pb-0.5 border-b-2 border-[#49557e] cursor-pointer"
                : "cursor-pointer hover:text-red-700 transition"
            }
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 sm:gap-10">
        {/* Search */}
        <Search className="w-5 h-5 cursor-pointer hover:text-red-700 transition" />

        {/* Cart */}
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-red-700 transition" />
          </Link>
          {totalCartAmount > 0 && (
            <div className="absolute min-w-2.5 min-h-2.5 bg-sky-300 rounded-md -top-2 -right-2"></div>
          )}
        </div>

        {/* User Menu - Only show when token exists */}
        {token ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer bg-transparent border-none p-0 rounded-full"
              aria-label="Toggle user menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <CircleUserRound className="w-6 h-6 sm:w-7 sm:h-7 hover:text-turquoise transition-colors duration-200 mt-2" />
            </button>

            {/* Overlay - closes menu when clicked */}
            {isOpen && (
              <button
                type="button"
                className="fixed inset-0 z-20"
                onClick={closeMenu}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    closeMenu();
                  }
                }}
                tabIndex={0}
                aria-label="Close menu"
              />
            )}

            {/* Dropdown Menu */}
            <ul
              className={`absolute right-0 z-30 mt-2 min-w-45 sm:min-w-50 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                isOpen
                  ? "opacity-100 visible pointer-events-auto"
                  : "opacity-0 invisible pointer-events-none"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  navigate("/myorders");
                  closeMenu();
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-[#262626] text-sm sm:text-base w-full"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#676767]" />
                <p>Orders</p>
              </button>
              <hr className="border-gray-200" />
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 cursor-pointer text-[#262626] text-sm sm:text-base w-full"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-[#676767]" />
                <p>Logout</p>
              </button>
            </ul>
          </div>
        ) : (
          /* Sign In Button - Desktop */
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="hidden sm:block bg-transparent text-[16px] text-[#49557e] border border-sky-300 px-6 sm:px-7.5 py-2.5 rounded-full cursor-pointer hover:bg-rose-50 hover:border-red-700 transition duration-300"
          >
            Sign In
          </button>
        )}

        {/* Hamburger Menu Button */}
        <button
          type="button"
          className="lg:hidden p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 cursor-pointer" />
          ) : (
            <Menu className="w-6 h-6 cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg lg:hidden flex flex-col p-6 gap-4 text-[#49557e] z-50 border-t">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                handleScroll(e, item.href);
                setMenu(item.id);
              }}
              className={`text-left py-2 text-lg ${
                menu === item.id
                  ? "text-red-700 font-semibold"
                  : "hover:text-red-700"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Sign In Button - Mobile (only when not logged in) */}
          {!token && (
            <button
              type="button"
              onClick={() => {
                setShowLogin(true);
                setIsMenuOpen(false);
              }}
              className="border border-sky-300 px-6 py-3 rounded-full text-center hover:bg-rose-50 hover:border-red-700 transition cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
