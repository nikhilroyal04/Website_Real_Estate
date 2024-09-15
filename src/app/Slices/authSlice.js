import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // Use js-cookie to handle cookies

// Initial state for the authentication slice
const initialState = {
  user: null,
  token: Cookies.get('authToken') || null, 
  isLoading: false,
  error: null,
};

// Create a slice for user authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      console.log('Login request initiated.');
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      console.log('Login successful:', action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      console.log('Login failed:', action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      console.log('User logged out.');
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      Cookies.remove('authToken'); // Remove token from cookies
    },
    setUser: (state, action) => {
      console.log('User details fetched:', action.payload);
      state.user = action.payload;
    },
  },
});

// Destructure actions from the slice
export const { loginRequest, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

// Thunk for handling login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // Perform login request
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}auth/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const { token } = response.data.data;
    console.log('Login response:', response.data);
    console.log('Token received:', token);

    // Store token in cookies
    Cookies.set('authToken', token, { expires: 10 }); 

    // Set user and token in state
    dispatch(loginSuccess({ user: null, token }));

    // Log headers before making the request
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    console.log('Headers for profile request:', headers);

    // Fetch additional user details from the profile API using the token
    const userDetailsResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}get/profile`, 
      { headers }
    );
    console.log('User details response:', userDetailsResponse.data);
    dispatch(setUser(userDetailsResponse.data.user));
  } catch (error) {
    console.error('Error during login or fetching user details:', error);
    dispatch(loginFailure(error.response?.data?.errorMessage || error.message));
  }
};

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
