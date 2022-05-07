import { appStorageName } from "../../globals/globals";
import { createSlice } from "@reduxjs/toolkit";

function getFavs() {
  let favsFromStorage = localStorage.getItem(appStorageName);
  if (favsFromStorage === null) {
    favsFromStorage = [];
  } else {
    favsFromStorage = JSON.parse(favsFromStorage);
  }
  return favsFromStorage;
}

const initialState = {
  items: getFavs(),
};

function getIndex(item, arr) {
  return arr.findIndex(arrItem => arrItem.id === item.id);
}

export const favsSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    addFav: (state, action) => {
      const newFavs = [...state.items, action.payload];
      localStorage.setItem(appStorageName, JSON.stringify(newFavs));
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = newFavs;
    },
    deleteFav: (state, action) => {
      const itemsCopy = state.items;
      itemsCopy.splice(getIndex(action.payload, state.items), 1);
      localStorage.setItem(appStorageName, JSON.stringify(itemsCopy));
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = itemsCopy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFav, deleteFav } = favsSlice.actions;

export default favsSlice.reducer;
