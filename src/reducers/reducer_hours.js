export default function(state={}, action) {
    switch(action.type) {
        case 'GET_HOURS':
            return Object.assign({}, state, action.payload);
    }
    return state;
}