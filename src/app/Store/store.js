import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../Slices/propertiesSlice";
import contactReducer from "../Slices/contactSlice";
import locationReducer from "../Slices/locationSlice";
import authReducer from "../Slices/authSlice";

const Store = configureStore({
  reducer: {
    property: propertyReducer,
    contact: contactReducer,
    location: locationReducer,
    auth: authReducer,
  },
});

export default Store;
