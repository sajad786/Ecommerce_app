/* eslint-disable */
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer
});

import { secureStorage } from "@/utils/secureStorage";

let currentCartItems: any[] = store.getState().cart.items;
let currentFavourites: any[] = store.getState().favourites.items;

store.subscribe(() => {
  const previousCartItems = currentCartItems;
  const previousFavourites = currentFavourites;
  
  const state = store.getState();
  currentCartItems = state.cart.items;
  currentFavourites = state.favourites.items;

  if (previousCartItems !== currentCartItems) {
    secureStorage.setObject('CART', currentCartItems);
  }
  if (previousFavourites !== currentFavourites) {
    secureStorage.setObject('FAVOURITES', currentFavourites);
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;