import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../utils/constants";

const BookingCard = ({ ticket }) => {
  return (
    <div className="bg-gradient-to-r from-[#2a0e1a] to-[#1a0a14] rounded-lg overflow-hidden w-72 sm:w-full md:w-full lg:w-full">
      <div className="flex flex-col sm:flex-row">
        {/* Movie Poster with Title Overlay */}
        <div className="relative w-full sm:w-48 h-48">
          <img
            src={ticket?.show?.movie?.movieImg}
            alt="title"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
            <h2 className="text-4xl font-bold text-white">
              {ticket?.show?.movie?.movieName}
            </h2>
          </div>
        </div>
        {/* Booking Details */}
        <div className="flex-1 p-4 flex flex-col sm:flex-row justify-between">
          <div className="space-y-2">
            <p className="text-gray-400">
              {Math.floor(Number(ticket?.show?.movie?.runtime) / 60)}h{" "}
              {Number(ticket?.show?.movie?.runtime) % 60}m
            </p>
            <p className="text-gray-300">
              {new Date(`${ticket?.show?.showDate}`).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                }
              )}{" "}
              at{" "}
              {new Date(`${ticket?.createdAt}`).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-3xl font-bold">{ticket?.bookingAmount}</p>
            <p className="text-gray-400">
              Total Tickets: {ticket?.bookedSeats.length}
            </p>
            <p className="text-gray-400">
              Seat Number: {ticket?.bookedSeats.join(", ")}
            </p>

            <button className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm transition-colors">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/myBookings`, {
        withCredentials: true,
      });
      setBookings(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <main className="px-4 md:px-8 lg:px-16 xl:px-32 py-8 mt-18">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {/* Booking Cards */}
      <div className="space-y-4 flex flex-col items-center">
        {/* K.O. Movie */}
        {bookings.length > 0 &&
          bookings.map((ticket) => <BookingCard ticket={ticket} />)}
      </div>
    </main>
  );
};

export default MyBookings;
