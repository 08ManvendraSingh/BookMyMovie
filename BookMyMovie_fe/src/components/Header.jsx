import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FaUser } from "react-icons/fa6";
import { removeUser } from "../store/userSlice";
import axios from "axios";
import { API_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`, null, {
        withCredentials: true,
      });

      if (response?.status == 200) {
        toast.success(response?.data?.message);
        dispatch(removeUser(null));
        setDropdownOpen(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-24 fixed top-0 left-0 right-0 z-10 text-white bg-[#0a0f18]">
      <div className="flex items-center">
        <Link to={"/"} className="text-2xl font-bold flex items-center">
          <span className="text-[#ff4d79]">B</span>ook
          <span className="text-[#ff4d79]">M</span>y
          <span className="text-[#ff4d79]">M</span>ovie
        </Link>
      </div>

      <div className="hidden md:flex items-center justify-center space-x-8 bg-[#1a2536]/80 px-8 py-2 rounded-full">
        <Link to={"/"} className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link to={"/movies"} className="hover:text-gray-300 transition">
          Movies
        </Link>
        <Link to={"/theaters"} className="hover:text-gray-300 transition">
          Theaters
        </Link>
        <Link to={"/releases"} className="hover:text-gray-300 transition">
          Releases
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <Link to={"/login"}>
            <button className="bg-[#ff4d79] hover:bg-[#ff3366] text-white px-6 py-1.5 rounded-full transition">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none cursor-pointer"
            >
              <FaUser size={28} className="text-white" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0a0f18] text-white rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-[#1a2536]"
                >
                  Profile
                </Link>
                <Link
                  to="/myBooking"
                  className="block px-4 py-2 hover:bg-[#1a2536]"
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-[#1a2536]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
