import { configureStore } from "@reduxjs/toolkit";
import { collabapi } from "./api";

const store = configureStore({
  reducer: {
    [collabapi.reducerPath]: collabapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(collabapi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
