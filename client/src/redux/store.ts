import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import profileSlice from "./slice/profileSlice";

const store = configureStore({
  reducer: { user: userSlice, profile: profileSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
