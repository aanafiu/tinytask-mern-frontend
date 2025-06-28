import { useContext, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { SiFacebookgaming } from "react-icons/si";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import CurrentUser from "../../Hooks/CurrentUser";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Current User
  const { userDetails, signOutUser, setLoading } = useContext(AuthContext);
  const { userCurrentData } = CurrentUser(userDetails?.email);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser().then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-Second font-extrabold text-Gold drop-shadow-[0_0_10px_Gold]">
          <span className="text-3xl font-extrabold">T</span>iny
          <span className="text-3xl font-extrabold">T</span>ask
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-sm uppercase font-semibold font-Main text-Light">
          <NavLink to="/" className="hover:text-Gold transition">
            Home
          </NavLink>
          <NavLink to="/tasks" className="hover:text-Gold transition">
            Tasks
          </NavLink>
          <NavLink to="/packages" className="hover:text-Gold transition">
            Packages
          </NavLink>
          <NavLink to="/stats" className="hover:text-Gold transition">
            Stats
          </NavLink>
          <NavLink to="/contact" className="hover:text-Gold transition">
            Contact
          </NavLink>
        </nav>

        {/* CTA Button */}
        {userCurrentData ? (
          <div className="relative group">
            <img
              src={userCurrentData.photoURL}
              alt="profilePhoto"
              className="w-12 h-12 rounded-xl border-2 border-Gold cursor-pointer"
            />

            <div className="absolute right-0 mt-2 w-40 bg-Primary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-Gold hover:bg-Muted hover:text-Light cursor-pointer"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-Light hover:bg-Muted hover:text-Gold cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to="/register"
            className="hidden md:block bg-Gold hover:bg-Muted hover:text-Gold text-Muted px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Get Started
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <span className="text-2xl text-Gold">
              <SiFacebookgaming />
            </span>
          ) : (
            <span className="text-2xl text-Gold">
              <FaRegWindowClose />
            </span>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#242c3c] font-semibold font-Main text-Light py-4 px-4 space-y-3">
          <NavLink to="/" className="block hover:text-Gold transition">
            Home
          </NavLink>
          <NavLink to="/tasks" className="block hover:text-Gold transition">
            Tasks
          </NavLink>
          <NavLink to="/packages" className="block hover:text-Gold transition">
            Packages
          </NavLink>
          <NavLink to="/stats" className="block hover:text-Gold transition">
            Stats
          </NavLink>
          <NavLink to="/contact" className="block hover:text-Gold transition">
            Contact
          </NavLink>

          {userCurrentData ? (
            <div className="bg-Primary shadow-lg space-y-2">
              <Link
                to="/dashboard"
                className="px-4 py-2text-sm text-Gold hover:bg-Muted hover:text-Light cursor-pointer"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-Light hover:bg-Muted hover:text-Gold cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="block bg-Gold hover:bg-Muted hover:text-Gold text-Muted text-center px-5 py-2 rounded-lg text-sm font-semibold transition"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Nav;
