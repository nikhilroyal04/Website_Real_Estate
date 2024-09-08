import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "../Slices/propertiesSlice";
import contactReducer from "../Slices/contactSlice";

const Store = configureStore({
  reducer: {
    property: propertyReducer,
    contact: contactReducer,
  },
});

export default Store;