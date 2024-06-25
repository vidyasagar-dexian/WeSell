import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import ProductCard from "../Components/ProductCard";

const cartSlice = createSlice({
    name:"cartSlice",
    initialState:[],
    reducers:{
        add(state,action){
            state.push(action.payload);
        },
        remove(state,action)
        {
            var removed = false;
            return state.filter(product =>{
                if(removed == true)return true;
                else if (product.id == action.payload)
                {
                    removed = true;
                    return false;
                }
                else return true;
            });
        } 
    },
});

export const {add,remove} = cartSlice.actions;
export default cartSlice.reducer;

