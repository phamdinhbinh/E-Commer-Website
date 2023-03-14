import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";


const initialState = {
  categories : [],
  categoryProducts : []

}

const categorySlice = createSlice({
 name: 'category',
 initialState,
 reducers:{},

 extraReducers: (builder) =>{
    builder
    .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
    })

    .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts =action.payload;
    })
 }

});


export const fetchAsyncCategories = createAsyncThunk('categories/fetch',async() => {
    const res = await fetch(`${BASE_URL}products/categories`)
    const data = res.json();
    return data;
})

export const fetchAsyncProductsOfCategory = createAsyncThunk('category-products/fetch', async(category) => {
    const res = await fetch(`${BASE_URL}/category/${category}`)
    const data = res.json();
    return data.products;
})  

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) => state.category.categoryProducts;
export default categorySlice.reducer;