import {GET_CATEGORIES_SUCCESS} from "../actions/categoriesActions";

const initialState = {
    categories: []
};

const categoriesReducer = (state = initialState, action) => {
    if (action.type === GET_CATEGORIES_SUCCESS) {
        return {...state, categories: action.categories};
    }

    return state;
};

export default categoriesReducer;