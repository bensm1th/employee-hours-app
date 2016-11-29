export default function(state={}, action) {
    switch (action.type) {
        case 'TABLE_FETCH':
            return {...action.payload.data};
        default: 
            return state
    }
}