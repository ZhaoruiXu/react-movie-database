import { catStorageName } from "../../globals/globals";
import { createSlice } from "@reduxjs/toolkit";

function getCategory() {
  let favsFromStorage = localStorage.getItem(catStorageName);
  if (favsFromStorage === null) {
    favsFromStorage = "popular";
  } else {
    favsFromStorage = JSON.parse(favsFromStorage);
  }
  return favsFromStorage;
}

const initialState = {
  item: getCategory(),
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      const newCategory = action.payload;
      localStorage.setItem(catStorageName, JSON.stringify(newCategory));
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.item = newCategory;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
