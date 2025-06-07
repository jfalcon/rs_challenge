import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./slices/error";

export const store = configureStore({
  reducer: {
    error: errorSlice,
  },
});

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
