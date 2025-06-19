import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaClock } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SeatArrangment = () => {
  const { mId, selectDate } = useParams();
  const [selectTime, setSelectTime] = useState(null);
  const [showData, setShowData] = useState([]);
  const [showOccupiedSeats, setShowOccupiedSeats] = useState([]);
  const [selecteSeats, setSelecteSeats] = useState([]);
  const [showId, setShowId] = useState(null);

  const { user } = useSelector((store) => store?.user);
  const navigate = useNavigate();

  const fetchShowData = async () => {
    try {
      const response = await axios.get(`${API_URL}/show/${mId}`, {
        withCredentials: true,
      });

      if (response?.status == 200) {
        setShowData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOccupiedSeats = async () => {
    try {
      const response = await axios.get(`${API_URL}/seats/${showId}`, {
        withCredentials: true,
      });

      if (response.status == 200) {
        setShowOccupiedSeats(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelBookTicket = async () => {
    try {
      if (!user) {
        return toast.error("Please Login first");
      }

      if (!selectTime || !selecteSeats.length) {
        return toast("Please select a time and seats");
      }

      const response = await axios.post(
        `${API_URL}/booking`,
        { showId: showId, selecteSeats },
        {
          withCredentials: true,
        }
      );

      if (response?.status == 200) {
        window.location = response?.data?.url;
        navigate("/myBooking");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectShowTime = (showTime, showId) => {
    setSelectTime(showTime);
    setShowId(showId);
  };

  useEffect(() => {
    fetchShowData();
  }, [mId]);

  useEffect(() => {
    if (selectTime) {
      fetchOccupiedSeats();
    }
  }, [selectTime]);

  const formatTime = (hour) => {
    const date = new Date();
    date.setHours(hour, 0, 0);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handelSeat = (seat) => {
    if (!selectTime) {
      return toast("Please select Time");
    }

    if (showOccupiedSeats.includes(seat)) {
      return toast("Seat already booked");
    }

    if (selecteSeats.includes(seat)) {
      setSelecteSeats(selecteSeats.filter((s) => s !== seat));
    } else {
      setSelecteSeats([...selecteSeats, seat]);
    }
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const renderSeatRow = (row, count) => {
    return (
      <div className="flex gap-1 justify-center my-1">
        {Array.from({ length: count }).map((_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={i}
              onClick={() => handelSeat(seatId)}
              className={`w-8 h-8 text-xs flex items-center justify-center cursor-pointer rounded-sm border border-pink-500 transition-colors
                           ${
                             selecteSeats.includes(seatId)
                               ? "bg-[#ff4d79]"
                               : "bg-transparent"
                           }
                            ${
                              showOccupiedSeats.includes(seatId) && "opacity-50"
                            }
                           `}
              aria-label={`Seat ${seatId}`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black bg-gradient-to-br from-black to-[#300] pt-4 pb-8 mt-18">
      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-20 py-8 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Fixed on larger screens */}
          <div className="md:w-64 md:flex-shrink-0">
            <div className="bg-[#200] bg-opacity-50 p-6 rounded-lg sticky top-8">
              <h2 className="text-white text-lg font-medium mb-4">
                Available Timings
              </h2>
              {showData.length > 0 &&
                showData.map((show) => (
                  <button
                    key={show?._id}
                    onClick={() =>
                      handleSelectShowTime(show?.showTime, show?._id)
                    }
                    className={`flex items-center gap-2 text-white border border-pink-500 rounded-md px-4 py-2 w-full transition-colors mb-1 cursor-pointer ${
                      selectTime == show?.showTime
                        ? "bg-[#ff4d79]"
                        : "bg-transparent hover:bg-[#ff4d79]"
                    }`}
                  >
                    <FaClock size={16} />
                    <span>{formatTime(show?.showTime)}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Seat Selection */}
          <div className="flex-1 overflow-y-auto max-h-[80vh] pr-0 md:pr-2 scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
            <h1 className="text-white text-2xl font-medium mb-8 text-center">
              Select your seat
            </h1>

            {/* Screen */}
            <div className="relative mb-12">
              <div className="h-2 bg-gradient-to-r from-transparent via-pink-500 to-transparent rounded-full mb-2"></div>
              <p className="text-gray-400 text-xs text-center">SCREEN SIDE</p>
            </div>

            {/* Seats Container - Horizontally scrollable on small screens */}
            <div className="overflow-x-auto pb-4 mb-8">
              <div className="min-w-[600px] flex flex-col items-center">
                {/* First two rows (A, B) */}
                <div className="mb-4">
                  {rows.slice(0, 2).map((row) => renderSeatRow(row, 9))}
                </div>

                {/* Middle rows (C, D, E, F) */}
                <div className="flex justify-center gap-8 mb-4">
                  {/* Left Column (C, D) */}
                  <div className="mb-4">
                    {rows.slice(2, 4).map((row) => renderSeatRow(row, 9))}
                  </div>

                  {/* Right Column (E, F) */}
                  <div className="mb-4">
                    {rows.slice(4, 6).map((row) => renderSeatRow(row, 9))}
                  </div>
                </div>

                {/* Last rows (G, H, I, J) */}
                <div className="flex justify-center gap-8">
                  {/* Left Column (G, H) */}
                  <div className="mb-4">
                    {rows.slice(6, 8).map((row) => renderSeatRow(row, 9))}
                  </div>

                  {/* Right Column (I, J) */}
                  <div className="mb-4">
                    {rows.slice(8, 10).map((row) => renderSeatRow(row, 9))}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center">
              <button
                onClick={() => handelBookTicket()}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors cursor-pointer 
                ${
                  selecteSeats.length > 0
                    ? "bg-[#ff4d79] hover:bg-pink-600 text-white"
                    : "bg-pink-500/50 text-white/70"
                }`}
              >
                Proceed to Checkout
                <FaArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatArrangment;
