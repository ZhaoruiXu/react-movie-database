import { searchQueryStorageName } from "../../globals/globals";
import { createSlice } from "@reduxjs/toolkit";

function getSearchQuery() {
  let searchQueryStorage = localStorage.getItem(searchQueryStorageName);
  if (searchQueryStorage === null) {
    searchQueryStorage = "";
  } else {
    searchQueryStorage = JSON.parse(searchQueryStorage);
  }
  return searchQueryStorage;
}

const initialState = {
  item: getSearchQuery(),
};

export const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    updateSearchQuery: (state, action) => {
      const newSearchQuery = action.payload;
      localStorage.setItem(
        searchQueryStorageName,
        JSON.stringify(newSearchQuery)
      );
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.item = newSearchQuery;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
