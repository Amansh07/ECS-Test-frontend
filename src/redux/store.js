import { configureStore } from "@reduxjs/toolkit";
import fpoRegistrationReducer from "./fpoRegistrationSlice";

const store = configureStore({
  reducer: {
    fpoRegistration: fpoRegistrationReducer,
  },
});

export default store;
