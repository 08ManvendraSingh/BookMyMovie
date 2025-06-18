import React from "react";
import { Link } from "react-router";
import appStore from "../assets/appStore.svg";
import googlePlay from "../assets/googlePlay.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0a0f18] py-16 px-6 md:px-16 lg:px-24 border-t border-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to={""} className="text-2xl font-bold flex items-center mb-4">
            <span className="text-[#ff4d79]">B</span>ook
            <span className="text-[#ff4d79]">M</span>y
            <span className="text-[#ff4d79]">M</span>ovie
          </Link>
          <p className="text-gray-400 text-sm mb-6">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="flex space-x-4">
            <Link
              to={""}
              className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition"
            >
              <img src={googlePlay} alt="Google Play" width={120} height={36} />
            </Link>
            <Link
              to={""}
              className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition"
            >
              <img src={appStore} alt="App Store" width={120} height={36} />
            </Link>
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to={""}
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-gray-400 hover:text-white transition"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-gray-400 hover:text-white transition"
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-gray-400 hover:text-white transition"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Get in touch</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">+1-234-567-890</li>
            <li className="text-gray-400">contact@BookMyMovie.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        Copyright 2025 © BookMyMovie. All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
