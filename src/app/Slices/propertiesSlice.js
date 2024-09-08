import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setpropertyData: (state, action) => {
      state.data = action.payload; 
      state.isLoading = false;
      state.error = null;
    },
    setpropertyLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setpropertyError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setpropertyData, setpropertyLoading, setpropertyError } = propertySlice.actions;

export const fetchAllpropertyData = (searchQuery = '', location = '', sublocation = '', propertyFor = '', propertyType = '') => async (dispatch) => {
  dispatch(setpropertyLoading());
  let allProperties = [];
  let page = 1;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}property/getAllProperties`,
        {
          params: {
            page,
            limit: 20,
            propertyNo: searchQuery,
            location,
            sublocation,
            propertyFor,
            propertyType,
          },
        }
      );

      const { properties, totalPages: fetchedTotalPages } = response.data.data; 
      allProperties = [...allProperties, ...properties];
      totalPages = fetchedTotalPages;
      page++;
    }

    dispatch(setpropertyData(allProperties)); 
  } catch (error) {
    dispatch(setpropertyError(error.message));
  }
};

export const AddpropertyData = (formData) => async (dispatch) => {
  try {
    await axios.post(
      import.meta.env.VITE_BASE_URL + "property/addProperty",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchAllpropertyData()); 
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectpropertyData = (state) => state.property.data;
export const selectpropertyLoading = (state) => state.property.isLoading;
export const selectpropertyError = (state) => state.property.error;

export default propertySlice.reducer;
