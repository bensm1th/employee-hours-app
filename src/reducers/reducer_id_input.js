export default function(state=[], action) {
    switch(action.type) {
        case 'ID_CHANGE':
            return [action.payload];
        default:
            return state;
    }
}