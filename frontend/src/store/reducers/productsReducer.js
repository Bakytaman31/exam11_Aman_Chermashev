import {GET_PRODUCT_SUCCESS, GET_PRODUCTS_SUCCESS} from "../actions/productsActions";

const initialState = {
    products: [],
    product: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {...state, products: action.products};
        case GET_PRODUCT_SUCCESS:
            return {...state, product: action.product};
        default:
            return state;
    }
};

export default productsReducer;