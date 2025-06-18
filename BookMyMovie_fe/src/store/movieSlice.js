import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idel",
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.movies=action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "rejected";
        state.error = true;
      });
  },
});

export const fetchMovies = createAsyncThunk(
  "getmovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies`, {
        withCredentials: true,
      });
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error);
    }
  }
);

export default movieSlice.reducer;
