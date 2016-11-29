export default function(state={}, action) {
    switch(action.type) {
        case 'EMPLOYEE_FETCH':
            return Object.assign({}, state, action.payload.data.employee);
            //return {...state, ...action.payload.data.employee};
        case 'EMPLOYEE_UPDATE':
            return {...action.payload.data};
        default:
            return state;
    }
}