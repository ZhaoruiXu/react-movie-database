import { configureStore } from "@reduxjs/toolkit";
import favsReducer from "../features/favs/favsSlice";
import categoryReducer from "../features/cats/categorySlice";

export const store = configureStore({
  reducer: {
    favs: favsReducer,
    cats: categoryReducer,
  },
});
