import {fetchUser ,fetchCart} from "../utils/FetchLocalStorageData"
const userData =fetchUser();
const cartData = fetchCart();

export const initialState = {
    user: userData,
    foodItems: null,
    cartShow: false,
    cartItems: cartData
}