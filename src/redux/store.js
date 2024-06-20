import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contactsSlice";
import filterSlice from "./filtersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterSlice,
  },
});
