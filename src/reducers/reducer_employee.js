import { EMPLOYEE_CLEAR, EMPLOYEE_FETCH, EMPLOYEE_UPDATE} from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case EMPLOYEE_FETCH:
            return Object.assign({}, action.payload.data.employee);
        case EMPLOYEE_UPDATE:
            return {...action.payload.data};
        case EMPLOYEE_CLEAR:
            return state;
        default:
            return state;
    }
}