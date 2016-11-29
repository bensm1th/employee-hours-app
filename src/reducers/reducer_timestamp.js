export default function(state={}, action) {
    switch(action.type) {
        case 'TIMESTAMP_POST':
            return Object.assign({}, action.payload.data);
        case 'LOGSTATE_CLEAR':
            return Object.assign({}, action.payload)
        default:
            return state;
    }
}
