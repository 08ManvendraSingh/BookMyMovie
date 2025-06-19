import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movieSlice";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { setUser } from "../store/userSlice";

const Landing = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store?.user);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const fetchUser = async () => {
    if (user) return;
    try {
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });

      if (response?.status == 200) {
        dispatch(setUser(response?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Landing;
