/* eslint-disable */
import { User } from "@/models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    userData: User;
    registeredUsers: RegisteredUser[];
    isFirstTime: boolean;
    auth_token: string;
}

export interface RegisteredUser {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}

const initialState: AuthState = {
    userData: {
        id: 0,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        image: "",
        token: "",
    },
    registeredUsers: [],
    isFirstTime: false,
    auth_token: "",

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveUserData: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
        setRegisteredUsers: (state, action: PayloadAction<RegisteredUser[]>) => {
            state.registeredUsers = action.payload;
        },
        addRegisteredUser: (state, action: PayloadAction<RegisteredUser>) => {
            state.registeredUsers = [...state.registeredUsers, action.payload];
        },
        changeFirstTime: (state, action: PayloadAction<boolean>) => {
            state.isFirstTime = action.payload;
        },
        saveAuthToken: (state, action: PayloadAction<string>) => {
            state.auth_token = action.payload;
        },
        clearData: (state) => {
            state.userData = {
                id: 0,
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                gender: "",
                image: "",
                token: "",
            };
            state.isFirstTime = false;
            state.auth_token = "";
        },
    },
});

export const { changeFirstTime, saveUserData, setRegisteredUsers, addRegisteredUser, saveAuthToken, clearData } = authSlice.actions;

export default authSlice.reducer;