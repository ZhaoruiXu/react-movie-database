import { configureStore } from "@reduxjs/toolkit";
import favsReducer from "../features/favs/favsSlice";
import categoryReducer from "../features/cats/categorySlice";
import searchQueryReducer from "../features/searchQuery/searchQuerySlice";
import navReducer from "../features/nav/navSlice";

export const store = configureStore({
  reducer: {
    favs: favsReducer,
    cats: categoryReducer,
    searchQuery: searchQueryReducer,
    navState: navReducer,
  },
});
