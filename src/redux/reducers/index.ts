/* eslint-disable */
import { combineReducers, Action } from "redux";
import auth, { AuthState } from "./auth";
import settings, { SettingsState } from "./settings";
import cart, { CartState } from "./cart";
import favourites, { FavouritesState } from "./favourites";

export interface RootState {
  auth: AuthState;
  settings: SettingsState;
  cart: CartState;
  favourites: FavouritesState;
}
const appReducer = combineReducers({
  auth,
  settings,
  cart,
  favourites,
});
const rootReducer = (state: RootState | undefined, action: Action<any>) => {
  return appReducer(state, action);
};
export default rootReducer;