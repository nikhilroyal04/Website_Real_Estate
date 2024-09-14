import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
    location: 'India',
    status: 'idle', 
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.status = 'loading'; 
    },
    setLocationSuccess: (state, action) => {
      state.location = action.payload;
      state.status = 'succeeded';
    },
    setLocationError: (state, action) => {
      state.error = action.payload;
      state.location = 'Error';
      state.status = 'failed';
    },
    resetLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.location = 'India';
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { setLocation, setLocationSuccess, setLocationError, resetLocation } = locationSlice.actions;
export const selectLocation = (state) => state.location.location;
export const selectLocationStatus = (state) => state.location.status;
export const selectLocationError = (state) => state.location.error;
export default locationSlice.reducer;

// Function to fetch city by latitude and longitude
export const fetchCityByLatLng = async (dispatch, latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const address = data.address;
    const city = address.city || address.town || address.village || 'Unknown City';
    dispatch(setLocationSuccess(city));
  } catch (error) {
    dispatch(setLocationError(error.message));
  }
};
