import axios from 'axios';
import { updateProducts } from '../Redux-store/ProductSlice';

const getProducts = () => async (dispatch) => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");
        dispatch(updateProducts(response.data));
    } catch (error) {
        console.error('Error fetching products: ', error);
    }
};

export default getProducts;