import { AUTH_ERROR, AUTH_USER, UNAUTH_USER, CLEAR_ERROR } from '../actions/types';
const initialState = {
    authenticated: false
}
export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case AUTH_ERROR:
            console.log('------- error in reducer -----------');
            console.log(action.payload);
            return  {...state, error: action.payload };
        case CLEAR_ERROR:
            return {...state, error: ''};
    }
    return state;
}