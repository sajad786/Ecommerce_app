import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/screens/main/Home/home.types";

export interface FavouritesState {
    items: Product[];
}

const initialState: FavouritesState = {
    items: [],
};

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        toggleFavourite: (state, action: PayloadAction<Product>) => {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                state.items.splice(existingIndex, 1);
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromFavourites: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        setFavourites: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        }
    },
});

export const { toggleFavourite, removeFromFavourites, setFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
