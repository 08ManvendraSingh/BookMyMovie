import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import signupImg from "../assets/signupImg1.png";
import axios from "axios";
import { API_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { validateSignupData } from "../utils/validate";

const Signup = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState({});
  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user } = useSelector((store) => store?.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      let validateError = validateSignupData(inputData);
      setError(validateError);
      if (Object.keys(validateError).length > 0) {
        return;
      }

      const response = await axios.post(`${API_URL}/signup`, inputData, {
        withCredentials: true,
      });

      if (response?.status == 200) {
        toast.success(response?.data?.message);
        setInputData({
          userName: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-b from-black to-[#0a0f18] mt-18">
      <div className="max-w-6xl rounded-md p-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1">
            <img
              src={signupImg}
              className="w-full aspect-[12/11] object-contain"
              alt="login-image"
            />
          </div>

          <form onSubmit={handleSignup} className="md:max-w-md w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-[#ff4d79]">Sign up</h3>
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="userName"
                  value={inputData.userName}
                  onChange={handleInput}
                  className="w-full text-sm border-b border-gray-300 focus:border-[#ff4d79] px-2 py-3 outline-none"
                  placeholder="Enter name"
                />
                <FaUser className="w-[18px] h-[18px] absolute right-2" />
              </div>
              {error?.userName && (
                <div className="text-red-500 text-sm mb-4">
                  {error?.userName}
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="email"
                  value={inputData.email}
                  onChange={handleInput}
                  className="w-full text-sm border-b border-gray-300 focus:border-[#ff4d79] px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <FaEnvelope className="w-[18px] h-[18px] absolute right-2" />
              </div>
              {error?.email && (
                <div className="text-red-500 text-sm mb-4">{error?.email}</div>
              )}
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input
                  type={viewPassword ? "text" : "password"}
                  name="password"
                  value={inputData.password}
                  onChange={handleInput}
                  className="w-full text-sm border-b border-gray-300 focus:border-[#ff4d79] px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                {!viewPassword ? (
                  <FaEye
                    onClick={() => setViewPassword(!viewPassword)}
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setViewPassword(!viewPassword)}
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  />
                )}
              </div>
              {error?.password && (
                <div className="text-red-500 text-sm mb-4">
                  {error?.password}
                </div>
              )}
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold tracking-wide rounded-md text-white bg-[#ff4d79] hover:bg-[#ff3366] focus:outline-none cursor-pointer"
              >
                Create an account
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">
                Already have an account?
                <Link
                  to={"/login"}
                  className="text-[#ff4d79] font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
