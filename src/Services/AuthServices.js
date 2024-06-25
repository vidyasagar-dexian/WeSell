import axios from 'axios';

const getUserData = () => async () => {
    try {
        const response = await axios.get("http://localhost:3000/users");
        return response.data;
    } catch (error) {
        console.error('Error fetching products: ', error);
    }
};



export default getUserData;