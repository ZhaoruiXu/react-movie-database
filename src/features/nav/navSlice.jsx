import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: false,
};

export const navSlice = createSlice({
  name: "navState",
  initialState,
  reducers: {
    updateNavState: (state, action) => {
      const newNavState = action.payload;
      state.item = newNavState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateNavState } = navSlice.actions;

export default navSlice.reducer;
