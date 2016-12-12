import { COMMENT_TEXT_INPUT, COMMENT_ADD_EMPLOYEE } from '../actions/types';

const initialState = {employee: '', comment: ''};

export default function(state=initialState, action) {
    switch(action.type) {
        case COMMENT_TEXT_INPUT:
            return {...state, comment: action.payload};
        case COMMENT_ADD_EMPLOYEE:
            return {...state, employee: action.payload};
        default:
            return state;
    }
}

