import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userInfo",
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export default UserSlice;
