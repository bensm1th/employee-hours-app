import { DATE_CLEAR, DATE_SET } from '../actions/types';

export default function(state={beginning: {}, end: {}}, action) {
    switch(action.type) {
        case DATE_SET:
            return {...state, [action.payload.type]: {...state[action.payload.type], [ action.payload.unit]: action.payload.value }};
        case DATE_CLEAR:
            return action.payload;
        default:
            return state;
    }
}