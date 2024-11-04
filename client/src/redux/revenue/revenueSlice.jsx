import { createSlice } from "@reduxjs/toolkit";

const RevenueSlice = createSlice({
  name: "revenue",
  initialState: [],
  reducers: {
    setRevenue(state, action) {
      return action.payload;
    },
  },
});

export default RevenueSlice;
