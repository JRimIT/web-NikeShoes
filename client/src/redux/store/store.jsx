import { configureStore } from "@reduxjs/toolkit";
import RevenueSlice from "../revenue/revenueSlice";
import UserSlice from "../userInfo/userSlice";

const store = configureStore({
  reducer: {
    revenue: RevenueSlice.reducer,
    userInfo: UserSlice.reducer,
  },
});
export default store;
