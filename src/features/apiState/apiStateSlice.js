import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  url: null,
};

export const apiStateSlice = createSlice({
  name: "apiState",
  initialState,
  reducers: {
    updating: (state, action) => {
      state.data = action.payload.data;
      state.url = action.payload.next
        ? action.payload.data.next
        : action.payload.data.previous;
    },
  },
});

export const { updating } = apiStateSlice.actions;

export default apiStateSlice.reducer;
