export const actionType = {
    SET_USER: "SET_USER",
    RESET_USER: "RESET_USER",
    SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
    SET_CART_SHOW: "SET_CART_SHOW",
    SET_CART_ITEMS: "SET_CART_ITEMS",
    CLEAR_CART_ITEMS: "CLEAR_CART_ITEMS"
};

const reducer = (state, action) => {

    switch (action.type) { 
        case actionType.SET_USER:
            localStorage.setItem("user",JSON.stringify(action.user))
            return {
                ...state,
                user: action.user,
            }
        case actionType.RESET_USER:
            localStorage.clear();
            return {
                ...state,
                user:null
            }
        case actionType.SET_FOOD_ITEMS:
            return {
                ...state,
                foodItems:action.foodItems,
            }
        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow:action.cartShow
            }
        case actionType.SET_CART_ITEMS:
            localStorage.setItem("cart",JSON.stringify(action.cartItems))
            return {
                ...state,
                cartItems:action.cartItems
            }
        case actionType.CLEAR_CART_ITEMS:
            localStorage.removeItem("cart")
            return {
                ...state,
                cartItems:action.cartItems
            }
        default:
            return state;
    }
}

export default reducer;