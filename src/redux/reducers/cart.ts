import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/screens/main/Home/home.types";

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            // Stock limit validation will happen on UI side or here.
            // But minimumOrderQuantity needs to be respected.
            const quantityToAdd = action.payload.minimumOrderQuantity > 1 ? action.payload.minimumOrderQuantity : 1;

            if (existingItem) {
                if (existingItem.quantity < action.payload.stock) {
                    existingItem.quantity += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: quantityToAdd });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > Math.max(1, item.minimumOrderQuantity)) {
                    item.quantity -= 1;
                } else {
                    // Option to remove item if it goes below minimum order quantity
                    state.items = state.items.filter(i => i.id !== action.payload);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        }
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
