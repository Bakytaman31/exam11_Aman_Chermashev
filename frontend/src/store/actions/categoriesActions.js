import axiosApp from "../../axiosApp";

export const GET_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export const getCategoriesSuccess = categories => ({type: GET_CATEGORIES_SUCCESS, categories});

export const getCategories = () => {
    return async dispatch => {
        const response = await axiosApp.get('/categories');
        dispatch(getCategoriesSuccess(response.data));
    }
};