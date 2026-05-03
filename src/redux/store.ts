/* eslint-disable */
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
    reducer: rootReducer
});

import { secureStorage } from "@/utils/secureStorage";
import type { User } from "@/models/User";

let currentCartItems: any[] = store.getState().cart.items;
let currentFavourites: any[] = store.getState().favourites.items;

/** Avoid overwriting secure auth before startup hydration completes (see getLocalItem). */
let authPersistenceReady = false;

function authPersistKey(token: string, isFirstTime: boolean, userData: User): string {
  return JSON.stringify({ auth_token: token, isFirstTime, userData });
}

let lastAuthPersistKey = "";

async function persistAuthSliceToSecureStorage(auth_token: string, isFirstTime: boolean, userData: User): Promise<void> {
  await secureStorage.setItem('IS_FIRST_TIME', String(isFirstTime));
  if (auth_token) {
    await secureStorage.setItem('AUTH_TOKEN', auth_token);
    await secureStorage.setObject('USER_DATA', userData);
  } else {
    await secureStorage.removeItem('AUTH_TOKEN');
    await secureStorage.removeItem('USER_DATA');
  }
}

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

  if (!authPersistenceReady) {
    return;
  }

  const { auth_token, isFirstTime, userData } = state.auth;
  const nextKey = authPersistKey(auth_token, isFirstTime, userData);
  if (nextKey === lastAuthPersistKey) {
    return;
  }
  lastAuthPersistKey = nextKey;

  void persistAuthSliceToSecureStorage(auth_token, isFirstTime, userData);
});

export function completeAuthHydration(): void {
  const auth = store.getState().auth;
  lastAuthPersistKey = authPersistKey(auth.auth_token, auth.isFirstTime, auth.userData);
  authPersistenceReady = true;
  void persistAuthSliceToSecureStorage(auth.auth_token, auth.isFirstTime, auth.userData);
}

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;