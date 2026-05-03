/**
 * @file checkStorage.ts
 * @description Utility functions for managing and retrieving persisted application state from secure storage.
 * This module is responsible for initializing the app with user preferences stored in secure storage.
 */

import { changeFirstTime, saveAuthToken, saveUserData, setRegisteredUsers } from "@/redux/reducers/auth";
import { LanguageInterface, saveDefaultLanguage, saveDefaultTheme } from "@/redux/reducers/settings";
import { setCart } from "@/redux/reducers/cart";
import { setFavourites } from "@/redux/reducers/favourites";
import store, { completeAuthHydration } from "@/redux/store";
import type { User } from "@/models/User";
import i18next from "i18next";
import { secureStorage } from "./secureStorage";
import { markHydratedState } from "@/redux/actions/auth";
const { dispatch } = store;

/**
 * Retrieves persisted application state from secure storage and initializes the Redux store.
 * 
 * @async
 * @function getLocalItem
 * @description This function runs at application startup to:
 *  1. Check if the app is running for the first time
 *  2. Load and apply the user's preferred language
 *  3. Load and apply the user's preferred theme
 *  4. Restore auth session (token / user profile) when present
 * 
 * @throws {Error} Will log any errors encountered during retrieval or dispatch
 * @returns {Promise<void>}
 * 
 * @example
 * // Called in App.tsx useEffect
 * getLocalItem();
 */
export const getLocalItem = async () => {
    try {
        // Check if this is the first time the app has been run
        const isFirstTimeRaw = await secureStorage.getItem('IS_FIRST_TIME');
        console.log('isFirstTime', isFirstTimeRaw);

        // Get saved language preferences
        const language = await secureStorage.getObject<LanguageInterface>('LANGUAGE');
        console.log('language', language);

        // Get saved theme preferences
        const theme = await secureStorage.getItem('THEME');
        console.log('theme', theme);

        const authToken = await secureStorage.getItem('AUTH_TOKEN');
        if (authToken) {
            dispatch(saveAuthToken(authToken));
            const userData = await secureStorage.getObject<User>('USER_DATA');
            if (userData && typeof userData === 'object') {
                dispatch(saveUserData(userData));
            }
            dispatch(changeFirstTime(true));
        } else {
            if (isFirstTimeRaw === 'true') {
                dispatch(changeFirstTime(true));
            } else if (isFirstTimeRaw === 'false') {
                dispatch(changeFirstTime(false));
            }
        }

        // Apply saved language if it exists
        if (language) {
            // Change i18next language
            i18next.changeLanguage(language.sortName);
            // Update Redux store with language preference
            dispatch(saveDefaultLanguage(language));
        }

        // Apply saved theme if it exists, otherwise set default light theme
        if (theme) {
            dispatch(saveDefaultTheme({ myTheme: theme }));
        } else {
            // Set default theme if none exists
            const systemTheme = 'light';
            await secureStorage.setItem('THEME', systemTheme);
            dispatch(saveDefaultTheme({ myTheme: systemTheme }));
        }

        // Get saved Cart and Favourites
        const cart = await secureStorage.getObject<any[]>('CART');
        if (cart) {
            dispatch(setCart(cart));
        }

        const favourites = await secureStorage.getObject<any[]>('FAVOURITES');
        if (favourites) {
            dispatch(setFavourites(favourites));
        }

        const registeredUsers = await secureStorage.getObject<any[]>('REGISTERED_USERS');
        if (registeredUsers) {
            dispatch(setRegisteredUsers(registeredUsers));
        }
    } catch (error) {
        console.log(error);
    } finally {
        completeAuthHydration();
        markHydratedState(true);
    }
}           