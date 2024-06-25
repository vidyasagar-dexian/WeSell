import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"productSlice",
    initialState:[],
    reducers:{
        updateProducts(state,action){
            state.splice(0, state.length, ...action.payload);
        }
    },
});

export const {updateProducts} = productSlice.actions;
export default productSlice.reducer;

