import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setcontactData: (state, action) => {
      state.data = action.payload.contacts;
      state.isLoading = false;
      state.error = null;
    },
    setcontactLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setcontactError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setcontactData, setcontactLoading, setcontactError } =
  contactSlice.actions;

export const fetchcontactData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "contact/getAllContacts"
    );
    // console.log("Fetched Data", response.data.data);
    dispatch(setcontactData(response.data.data));
  } catch (error) {
    dispatch(setcontactError(error.message));
  }
};

export const AddcontactData = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "contact/createContact",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchcontactData());
  } catch (error) {
    console.error("Error:", error);
  }
};

export const selectcontactData = (state) => state.contact.data;
export const selectcontactLoading = (state) => state.contact.isLoading;
export const selectcontactError = (state) => state.contact.error;

export default contactSlice.reducer;
