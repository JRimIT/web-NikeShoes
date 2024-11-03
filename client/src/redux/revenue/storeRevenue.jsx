import { configureStore } from "@reduxjs/toolkit";
import RevenueSlice from "./revenueSlice";

const store = configureStore({
  reducer: {
    revenue: RevenueSlice.reducer,
  },
});
export default store;
