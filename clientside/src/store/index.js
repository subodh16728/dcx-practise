import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./slice/getProductsSlice";

const store = configureStore({
    reducer: {
        api: apiSlice
    }
})

export default store;