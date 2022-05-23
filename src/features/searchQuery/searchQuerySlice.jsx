// import { searchQueryStorageName } from "../../globals/globals";
import { createSlice } from "@reduxjs/toolkit";

// function getSearchQuery() {
//   let searchQueryStorage = localStorage.getItem(searchQueryStorageName);
//   if (searchQueryStorage === null) {
//     searchQueryStorage = "";
//   } else {
//     searchQueryStorage = JSON.parse(searchQueryStorage);
//   }
//   return searchQueryStorage;
// }

const initialState = {
  // item: getSearchQuery(),
  item: "",
};

export const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    updateSearchQuery: (state, action) => {
      const newSearchQuery = action.payload;
      state.item = newSearchQuery;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
