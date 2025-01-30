import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/UserReducer"; // Import the reducer, not the slice


export const Store = configureStore({
    reducer: {
        user: userReducer,
       
    }
});
