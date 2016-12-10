import { EMPLOYEE_CLEAR, EMPLOYEE_FETCH, EMPLOYEE_UPDATE, POST_EMPLOYEE_ERROR, EMPLOYEE_POST} from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case EMPLOYEE_POST:
            return {...state, error: action.payload}
        case EMPLOYEE_FETCH:
            return Object.assign({}, action.payload.data.employee);
        case EMPLOYEE_UPDATE:
            return {...action.payload.data};
        case EMPLOYEE_CLEAR:
            return state;
        case POST_EMPLOYEE_ERROR:
            console.log('action.payload');
            console.log(action.payload);
            return {error: action.payload }
        default:
            return state;
    }
}