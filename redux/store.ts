import { configureStore } from "@reduxjs/toolkit";
import { collabapi } from "./api";
import formData from "./PostSlice";

const store = configureStore({
  reducer: {
    [collabapi.reducerPath]: collabapi.reducer,
    formData: formData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collabapi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
