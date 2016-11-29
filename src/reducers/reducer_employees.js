export default function(state = [], action) {
    switch(action.type) {
        case 'EMPLOYEES_FETCH':
            return [...action.payload.data.employees];
        default:
            return state;
    }
}