import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess= (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId
    };
};

export const authFail= (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        // Post auth to the server
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const key = 'AIzaSyCEVxdo1pCxH-f06-8Ydyf11Lg9hhjCqwI';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`; // Signup
        if (!isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}` // SignIn

        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));

                // Logout user after 1 hour
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error)); 
            })
    };
};

