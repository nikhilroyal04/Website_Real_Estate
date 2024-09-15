import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // Use js-cookie to handle cookies

// Initial state for the authentication slice
const initialState = {
  user: null,
  token: Cookies.get("authToken") || null,
  isLoading: false,
  error: null,
};

// Create a slice for user authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      Cookies.remove("authToken");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Destructure actions from the slice
export const { loginRequest, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

// Thunk for handling login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // Perform login request
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const { token } = response.data.data;

    // Set user and token in state
    dispatch(loginSuccess({ user: null, token }));

    // Log headers before making the request
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Fetch additional user details from the profile API using the token
    const userDetailsResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}get/profile`,
      { headers, withCredentials: true }
    );
    dispatch(setUser(userDetailsResponse.data.data));
    return response;

  } catch (error) {
    console.error("Error during login or fetching user details:", error);
    // Handle possible undefined data in the error object
    dispatch(
      loginFailure(
        error.response?.data?.errorMessage ||
          error.message ||
          "An unexpected error occurred"
      )
    );
  }
};

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
