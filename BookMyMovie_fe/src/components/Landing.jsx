import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import {useDispatch} from 'react-redux';
import { fetchMovies } from "../store/movieSlice";

const Landing = () => {

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchMovies());
  },[dispatch])

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
