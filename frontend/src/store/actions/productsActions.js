import axiosApp from "../../axiosApp";
import {push} from 'connected-react-router';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';

export const getProductsSuccess = products => ({type: GET_PRODUCTS_SUCCESS, products});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const getProductSuccess = product => ({type: GET_PRODUCT_SUCCESS, product});

export const getProducts = () => {
    return async (dispatch) => {
        const response = await axiosApp.get('/products');
        dispatch(getProductsSuccess(response.data));
    };
};

export const createProduct = productData => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApp.post('/products', productData, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(createProductSuccess());
    };
};

export const getProduct = id => {
    return async dispatch => {
        const response = await axiosApp.get('/products/' + id);
        dispatch(getProductSuccess(response.data));
    }
};

export const deleteProduct = id => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        await axiosApp.delete(`/products/${id}`, {headers: {'Authorization': 'Token ' + user.token}});
        dispatch(push('/'));
    }
};