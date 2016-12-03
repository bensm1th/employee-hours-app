import { TIMESTAMP_POST, LOGSTATE_CLEAR } from '../actions/types';
const initialState = { 
    employee: {}, 
    logState: {
        show: false,
        error: { message: ''},
        success: { message: ''}
    }, 
    timestamp: {}
}
export default function(state = initialState, action) {
    switch(action.type) {
        case TIMESTAMP_POST:
            return Object.assign({}, state, action.payload.data);
        case LOGSTATE_CLEAR:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
