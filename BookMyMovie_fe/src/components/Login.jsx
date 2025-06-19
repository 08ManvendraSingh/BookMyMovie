import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import loginImg from "../assets/loginImg1.png";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { validateLoginData } from "../utils/validate";

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState({});
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store?.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      let validateError = validateLoginData(inputData);
      setError(validateError);
      if (Object.keys(validateError).length > 0) {
        return;
      }

      const response = await axios.post(`${API_URL}/login`, inputData, {
        withCredentials: true,
      });

      if (response?.status == 200) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.data));
        setInputData({
          email: "",
          password: "",
        });
        navigate("/");
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
              src={loginImg}
              className="w-full aspect-[12/11] object-contain"
              alt="login-image"
            />
          </div>

          <form onSubmit={handleLogin} className="md:max-w-md w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-[#ff4d79]">Sign in</h3>
            </div>

            <div>
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
                Sign in
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">
                {`Don't have an account`}
                <Link
                  to={"/signup"}
                  className="text-[#ff4d79] font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
