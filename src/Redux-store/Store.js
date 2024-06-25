import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import ProductCard from "../Components/ProductCard";
import ProductSlice from "./ProductSlice";

const store = configureStore({
    reducer:{
        cartSlice : CartSlice,
        productSlice : ProductSlice
    }
});

export default store;