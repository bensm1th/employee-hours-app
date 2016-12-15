import { AUTH_OWNER, FETCH_OWNER_MESSAGE, UNAUTH_OWNER } from '../actions/types';
const initialState = {
    authenticated: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_OWNER:
            return {...state, authenticated: true, message: '' };
        case UNAUTH_OWNER:
            return { ...state, authenticated: false };
        default:
            return state;
    }
}