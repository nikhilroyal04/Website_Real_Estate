import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../Slices/propertiesSlice";
import contactReducer from "../Slices/contactSlice";
import locationReducer from "../Slices/locationSlice";

const Store = configureStore({
  reducer: {
    property: propertyReducer,
    contact: contactReducer,
    location: locationReducer,
  },
});

export default Store;
