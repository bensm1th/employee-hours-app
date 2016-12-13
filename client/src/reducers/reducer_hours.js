import { UPDATE_HOURS, CELL_BLUR, CELL_CLICKED, SAVE_TABLE, POST_HOURS, GET_TABLE, COMMENT_ADD, COMMENT_CLEAR } from '../actions/types';

const timeType = (payload) => {
    const totalTime = payload.update.hours + ":" + payload.update.mins;
    switch(payload.update.type) {
        case 'Vacation':
            return {'vacationTime': totalTime};
        case 'Sick':
            return {'sickTime': totalTime};
        case 'Absent':
            return {'absentTime': totalTime};
        case 'holiday':
            return {'holiday': totalTime};
        default:
            return;
    }
}

const changeTable = (state={}, action) => {
    switch(action.type) {
        case UPDATE_HOURS:
            if (state.id === action.payload.id) {
                const typeObj = timeType(action.payload);
                return Object.assign({}, state, {editable: false}, typeObj)
            }
            return state;
        case CELL_BLUR:
        case CELL_CLICKED:
            if (action.payload.id === state.id) {
            
                return {...state, editable: !state.editable};
            }
            return {...state, editable: false};
        default:
            return state;
    }
}

const change = (state={}, action) => {
    return {...state, hours: {...state.hours, tableArr: [...state.hours.tableArr.map(e=>changeTable(e, action))] }};
}

const initialState = {
    data: {comments: [], data: [], dates: [], salariedEmployees: []}
}

const deleteComment = (comment, action) => {
    if (comment.id !== action.payload) {
        return comment;
    }
    return {};
}
export default function(state=initialState, action) {
    switch(action.type) {
        case COMMENT_CLEAR:
            return {...state, data: {...state.data, comments: [...state.data.comments.map(comment=> deleteComment(comment, action))]}};
        case SAVE_TABLE:
            return Object.assign({}, state, action.payload);
        case POST_HOURS:
            return Object.assign({}, state, action.payload);
        case GET_TABLE:
            return Object.assign({}, state, action.payload);
        case COMMENT_ADD:       
            return {...state, data: {...state.data, comments: [...state.data.comments, action.payload]}};
        case UPDATE_HOURS:
        case CELL_BLUR:
        case CELL_CLICKED:
            return {...state, data: {...state.data, data: [...state.data.data.map(e=>change(e, action)) ]}};
        default:
            return state;
    }
}


