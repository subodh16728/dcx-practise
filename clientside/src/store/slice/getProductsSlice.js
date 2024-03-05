import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const response = await fetch("http://localhost:5000/api/products")
    console.log(response)
    return response.json()
})

const apiSlice = createSlice({
    name: "fetchapi",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts
            .pending, (state) => {
                state.isLoading = true;
            });
        builder.addCase(fetchProducts
            .fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            });
        builder.addCase(fetchProducts
            .rejected, (state, action) => {
                state.isError = true;
                console.log("Error: ", action.payload);
            });
    }
})

export default apiSlice.reducer;