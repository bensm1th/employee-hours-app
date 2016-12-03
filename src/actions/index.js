import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER, UNAUTH_USER, DATE_CLEAR, 
    DATE_SET, TABLE_DELETE, EMPLOYEE_DELETE, TABLE_FETCH, 
    EMPLOYEE_POST, LOGSTATE_CLEAR, ID_CHANGE, TIMESTAMP_POST, 
    EMPLOYEE_UPDATE, EMPLOYEES_POST, EMPLOYEE_FETCH, 
    EMPLOYEE_CLEAR, EMPLOYEES_FETCH, POST_HOURS, SAVE_TABLE, 
    GET_TABLE, CELL_BLUR, CELL_CLICKED, AUTH_ERROR, CLEAR_ERROR, UPDATE_HOURS
 } from './types';
const ROOT_URL = 'http://localhost:3000/hours';
const EMPLOYEE_URL = 'http://localhost:3000/employee';
const TIMESTAMP_URL = 'http://localhost:3000/timestamp';
const AUTH_URL = 'http://localhost:3000';


export function clearAuthErrorMessage() {
    return {
        type: CLEAR_ERROR
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return {
        type: UNAUTH_USER   
    }
}

export function signinUser({ email, password }) {
    return function(dispatch) {
        //Submit email/password to the server
        axios.post(`${AUTH_URL}/signin`, { email, password }) 
            .then(response => {
                //if request is good...
                //-update state to indicate user authenticated
                dispatch( { type: AUTH_USER });
                //-save the JWT token
                //in local storage?
                localStorage.setItem('token', response.data.token);
                //-redirect the user to the 'feature'
                browserHistory.push('/');
            })
            .catch(()=> {
                //if request is bad
                //-show an error to the user
                dispatch(authError('Bad Signin Info'));
            });
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${AUTH_URL}/signup`, { email, password })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/');
        })
        .catch(response => {
            console.log('response in action creator')
            console.log(response.response.data.error);
            dispatch(authError(response.response.data.error)
        )});
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}


export function clearDates() {
    const dates = {beginning: {}, end: {}};
    return {
        type: DATE_CLEAR,
        payload: dates
    }
}

export function setHoursValues(date) {
    return {
        type: DATE_SET,
        payload: date
    }
}

export function deleteTable(id) {
    const request = axios.delete(`${ROOT_URL}/${id}`);
    return {
        type: TABLE_DELETE,
        payload: request
    }
}

export function deleteEmployee(id) {
    const request = axios.delete(`${EMPLOYEE_URL}/${id}`);
    return {
        type: EMPLOYEE_DELETE,
        payload: request
    }
}

export function fetchTables() {
    const request = axios.get(`${ROOT_URL}`);
    return {
        type: TABLE_FETCH,
        payload: request
    }
}

export function postEmployee(form) {
    const request = axios.post(`${EMPLOYEE_URL}/new`, form);
    return {
        type: EMPLOYEE_POST,
        payload: request
    }
}

export function clearLogState() {
    return {
        type: LOGSTATE_CLEAR,
        payload: {}
    }
}

export function onIdChange(change) {
    return {
        type: ID_CHANGE,
        payload: change
    }
}

export function postTimestamp(form) {
    const request = axios.post(`${TIMESTAMP_URL}`, form);
    return {
        type: TIMESTAMP_POST,
        payload: request
    }
}

export function updateEmployee(id, form) {
    const request = axios.put(`${EMPLOYEE_URL}/${id}`, form);
    return {
        type: EMPLOYEE_UPDATE,
        payload: request
    }
}

export function fetchEmployee(id) {
    const request = axios.get(`${EMPLOYEE_URL}/${id}`);
    return {
        type: EMPLOYEE_FETCH,
        payload: request
    }
}

export function clearEmployee() {
    const employee = {};
    return {
        type: EMPLOYEE_CLEAR,
        payload: employee
    }
}

export function fetchEmployees() {
    const request = axios.get(EMPLOYEE_URL);
    return {
        type: EMPLOYEES_FETCH,
        payload: request
    }
}

export function postHours(beginning, end) {
    const request = axios.post(ROOT_URL, {beginning, end});
    return {
        type: POST_HOURS,
        payload: request
    }
}

export function saveTable(hours) {
    const request = axios.put(`${ROOT_URL}/${hours.data._id}`, hours.data);
    return {
        type: SAVE_TABLE,
        payload: {hours}
    }
}

export function fetchTableData(id) {
    const request = axios.get(`${ROOT_URL}/${id}`);
    return {
        type: GET_TABLE,
        payload: request
    }
}

export function cellClick(employeeId, date, id) {
    return {
        type: CELL_CLICKED,
        payload: {employeeId, date, id}
    }
}

export function cellBlur(employeeId, date, id) {
    return {
        type: CELL_BLUR,
        payload: {employeeId, date, id}
    }
}

export function updateHours(employeeId, date, id, update) {
    return {
        type: UPDATE_HOURS,
        payload: {employeeId, date, id, update}
    }
}





