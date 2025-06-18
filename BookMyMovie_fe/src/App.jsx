import { Route, Routes } from "react-router";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";
import SeatArrangment from "./components/SeatArrangment";
import MyBookings from "./components/MyBookings";
import Loading from "./components/Loading";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:mId" element={<MovieDetail />} />
          <Route path="/seat/:mId/:selectDate" element={<SeatArrangment />} />
          <Route path="/myBooking" element={<MyBookings />} />
          <Route path="/loading/:nextUrl" element={<Loading />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
