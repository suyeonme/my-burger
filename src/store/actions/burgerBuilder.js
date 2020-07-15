import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = name => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: name
    };
};

// Fetching data (async code) with redux thunk 
export const setIngredient = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL
    };
};

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('Ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientFailed());
            })
    };
};