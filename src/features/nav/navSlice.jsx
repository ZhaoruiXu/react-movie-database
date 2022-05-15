import { navStateStorageName } from "../../globals/globals";
import { createSlice } from "@reduxjs/toolkit";

function isNavOpen() {
  let navStateFromStorage = localStorage.getItem(navStateStorageName);
  if (navStateFromStorage === null) {
    navStateFromStorage = false;
  } else {
    navStateFromStorage = JSON.parse(navStateFromStorage);
  }
  return navStateFromStorage;
}

const initialState = {
  item: isNavOpen(),
};

export const navSlice = createSlice({
  name: "navState",
  initialState,
  reducers: {
    updateNavState: (state, action) => {
      const newNavState = action.payload;
      localStorage.setItem(navStateStorageName, JSON.stringify(newNavState));
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.item = newNavState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateNavState } = navSlice.actions;

export default navSlice.reducer;
