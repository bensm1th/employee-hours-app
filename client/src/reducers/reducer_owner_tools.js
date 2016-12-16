import { MANAGERS_FETCH, MANAGER_FILTER_CHANGE, ACTIVE_MANAGER_POST, MANAGER_UPDATE, TABLE_FETCH } from '../actions/types';
import filter_types from '../components/owner/filter_types';

const initialState = {
    managers: [],
    tables_approved: [],
    tables_finalized: [],
    manager_filter: filter_types.table,
    active_manager: {
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
    },
    active_table: {comments: [], data: [], dates: [], salariedEmployees: [], createdBy: {}, approved:{}, finalized: {}}
}
export default function(state= initialState, action) {
    switch (action.type) {
        case MANAGERS_FETCH:
            return {...state, managers: [...action.payload.data.managers]};
        case MANAGER_UPDATE:
            return {...state, active_manager: action.payload}
        case ACTIVE_MANAGER_POST:
            return {...state, active_manager: action.payload.manager}
        case MANAGER_FILTER_CHANGE:
            return {...state, manager_filter: action.payload};
        case TABLE_FETCH:
            return {...state, tables_approved: action.payload.data.approvedTables, tables_finalized: action.payload.data.finalizedTables}
        default:
            return state;
    }
}
