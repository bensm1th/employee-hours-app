import { AUTH_ERROR, AUTH_USER, UNAUTH_USER, CLEAR_ERROR, FETCH_MESSAGE, ID_USER, UN_ID_USER } from '../actions/types';
const initialState = {
    authenticated: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case AUTH_ERROR:
            return  {...state, error: action.payload };
        case CLEAR_ERROR:
            return {...state, error: ''};
        case FETCH_MESSAGE:
            return {...state, message: action.payload};
        case ID_USER:
            return {...state, id: action.payload};
        case UN_ID_USER:
            return {...state, id: ''};
        default:
            return state;
    }
}