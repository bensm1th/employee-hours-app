import { EMPLOYEE_CLEAR, EMPLOYEE_FETCH, EMPLOYEE_UPDATE, 
    POST_EMPLOYEE_ERROR, EMPLOYEE_POST, EMPLOYEE_ERR_CLEAR } from '../actions/types';

const initialState = {
    DOB: '',
    address: '',
    comments: [],
    currentlyWorking: false,
    employeeNumber: '',
    firstName: '',
    hourlyPay: {applies: false},
    salary: {applies: false},
    lastName: '',
    sickDaysLeft: '',
    vacactionDaysLeft: '',
    error: ''
}

export default function(state = initialState, action) {
    
    switch(action.type) {
        case EMPLOYEE_POST:
            return {...state, error: action.payload};
        case EMPLOYEE_FETCH:
            console.log('state in reducer');
            console.log(state);
            return Object.assign({}, action.payload.data.employee);
        case EMPLOYEE_UPDATE:
            return {...state};
        case EMPLOYEE_CLEAR:
            return state;
        case POST_EMPLOYEE_ERROR:
            return {...state, error: action.payload };
        case EMPLOYEE_ERR_CLEAR:
            return {...state, error: ''}
    }
    return state;
}