import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,  
    totalPages: 1,  
    propertyById: null, 
  },
  reducers: {
    setpropertyData: (state, action) => {
      state.data = action.payload.properties;  
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
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
    setPropertyById: (state, action) => {
      state.propertyById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setPropertyByIdError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setpropertyData, setpropertyLoading, setpropertyError, setPropertyById, setPropertyByIdError } = propertySlice.actions;

export const fetchAllpropertyData = (page = 1, searchQuery = '', location = '', subLocation = '', propertyFor = '', propertyType = '', propertySubtype='') => async (dispatch) => {
  dispatch(setpropertyLoading());

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}property/getAllProperties`,
      {
        params: {
          page,
          limit: 20,
          propertyNo: searchQuery,
          location,
          subLocation,
          propertyFor,
          propertyType,
          propertySubtype,
        },
      }
    );

    const { properties, totalPages } = response.data.data; 

    dispatch(setpropertyData({
      properties,   
      totalPages,   
      currentPage: page,  
    }));
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

export const fetchPropertyById = (id) => async (dispatch) => {
  dispatch(setpropertyLoading());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}property/getProperty/${id}`
    );
    dispatch(setPropertyById(response.data.data));
  } catch (error) {
    dispatch(setPropertyByIdError(error.message));
  }
};

export const selectpropertyData = (state) => state.property.data;
export const selectpropertyLoading = (state) => state.property.isLoading;
export const selectpropertyError = (state) => state.property.error;
export const selectTotalPages = (state) => state.property.totalPages;  
export const selectCurrentPage = (state) => state.property.currentPage;  
export const selectPropertyById = (state) => state.property.propertyById;


export default propertySlice.reducer;
