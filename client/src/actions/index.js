import axios from 'axios';
import { browserHistory } from 'react-router';
import { 
    AUTH_USER, UNAUTH_USER, DATE_CLEAR, 
    DATE_SET, TABLE_DELETE, EMPLOYEE_DELETE, TABLE_FETCH, 
    EMPLOYEE_POST, LOGSTATE_CLEAR, ID_CHANGE, TIMESTAMP_POST, 
    EMPLOYEE_UPDATE, EMPLOYEES_POST, EMPLOYEE_FETCH, 
    EMPLOYEE_CLEAR, EMPLOYEES_FETCH, POST_HOURS, SAVE_TABLE, 
    GET_TABLE, CELL_BLUR, CELL_CLICKED, AUTH_ERROR, CLEAR_ERROR, 
    UPDATE_HOURS, FETCH_MESSAGE, AUTH_OWNER, FETCH_OWNER_MESSAGE,
    UNAUTH_OWNER, POST_EMPLOYEE_ERROR, EMPLOYEE_ERR_CLEAR, COMMENT_ADD,
    COMMENT_TEXT_INPUT, COMMENT_ADD_EMPLOYEE, COMMENT_CLEAR, MANAGERS_FETCH,
    MANAGER_FILTER_CHANGE, ACTIVE_MANAGER_POST, MANAGER_UPDATE
 } from './types';
import filter_types from '../components/owner/filter_types';
const ROOT_URL = '/tlchours';
const EMPLOYEE_URL = '/tlcemployee';
const TIMESTAMP_URL = '/timestamp';
const AUTH_URL = '';
const OWNER_URL = '/tlcowner';
import { v4 } from 'node-uuid';

export function clearEmployeeErrorMessage() {
    return {
        type: EMPLOYEE_ERR_CLEAR
    }
}


export function fetchMessage() {
    return function(dispatch) {
        axios.get(`${AUTH_URL}`, {
            headers: { authorization: localStorage.getItem('token') }
        }). 
            then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
}

export function clearAuthErrorMessage() {
    return {
        type: CLEAR_ERROR
    }
}

export function signoutOwner() {
    localStorage.removeItem('ownerToken');

    return {
        type: UNAUTH_OWNER
    }
}

export function signoutUser() {
    return function(dispatch) {
        localStorage.removeItem('token');
        localStorage.removeItem('ownerToken');
        dispatch({ type: UNAUTH_OWNER });
        dispatch({ type: UNAUTH_USER })
    }
}

export function signinOwner({ email, password }) {
    return function(dispatch) {
        //Submit email/password to the server
        axios.post(`${OWNER_URL}/signin`, { email, password }). 
            then(response => {
                //if request is good...
                //-update state to indicate user authenticated
                dispatch( { type: AUTH_OWNER });
                dispatch( { type: AUTH_USER });
                //-save the JWT token
                //in local storage?
                localStorage.setItem('ownerToken', response.data.ownerToken);
                localStorage.setItem('token', response.data.ownerToken )

                //-redirect the user to the 'feature'
                browserHistory.push('/owner');
            })
            .catch(()=> {
                //if request is bad
                //-show an error to the user
                dispatch(authError('Bad Signin Info'));
            });
    }
}

export function signupOwner({ email, password, secret }) {
    return function(dispatch) {
        axios.post(`${OWNER_URL}/signup`, { email, password, secret})
        .then(response => {
            dispatch({ type: AUTH_OWNER });
            dispatch({ type: AUTH_USER });
            localStorage.setItem('ownerToken', response.data.ownerToken);
            localStorage.setItem('token', response.data.ownerToken );
            browserHistory.push('/owner');
        })
        .catch(response => {
            dispatch(authError(response.response.data.error)
        )});
    }
}

export function postEmployee(form) {
    if (form.payType === 'hourlyPay') {
        form.hourlyPay = {applies: true, rate: form.pay};
    }
    if (form.payType === 'salary') {
        form.salary = {applies: true, monthlyRate: form.pay};
    }
    return function(dispatch) {
        axios.post(`${EMPLOYEE_URL}/new`, form, { headers: { authorization: localStorage.getItem('token') } }) 
            .then(response => {
                dispatch({ type: EMPLOYEE_POST, payload: response.data.message });
                browserHistory.push('/employee');
            }) 
            .catch(response=> {
                dispatch(postEmployeeError(response.response.data.message));
            });
    }
}

function postEmployeeError(error) {
    return {
        type: POST_EMPLOYEE_ERROR,
        payload: error
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

export function signupUser(formProps) {
    if (formProps.payType === 'hourlyPay') {
        formProps.hourlyPay = {applies: true, rate: formProps.pay};
        formProps.salary = {applies: false, monthlyRate: 0};
    }
    if (formProps.payType === 'salary') {
        formProps.salary = {applies: true, monthlyRate: formProps.pay};
        formProps.hourlyPay = {applies: false, rate: 0};
    }
    return function(dispatch) {
        const options = { headers: { authorization: localStorage.getItem('ownerToken') } };
        axios.post(`${AUTH_URL}/signup`, formProps, options) 
            .then(response => {
                browserHistory.push('/owner');
            }) 
    }
}

export function changeManagerFilter(filter, manager) {
    return function(dispatch) {
        if (manager) {
            dispatch({
                type: ACTIVE_MANAGER_POST,
                payload: manager
            });
        }
        dispatch({
            type: MANAGER_FILTER_CHANGE,
            payload: filter
        });
    }
    
}
export function updateManager(formProps, id) {
    return function(dispatch) {
        const options = { headers: { authorization: localStorage.getItem('ownerToken') } };
        axios.put(`${OWNER_URL}/${id}`, formProps, options)
            .then(result=> {
                dispatch({
                    type: MANAGER_UPDATE,
                    payload: result.data.manager
                });
                dispatch({
                    type: MANAGER_FILTER_CHANGE,
                    payload: filter_types.show
                });
                dispatch(fetchManagers());
            })
            .catch(result=>{
                
                }
            )
    }
}

export function deleteManager(id) {
    return function(dispatch) {
    const options = { headers: { authorization: localStorage.getItem('ownerToken') } };
    axios.delete(`${OWNER_URL}/${id}`, options)
        .then(result=> {
            dispatch({
                type: MANAGER_FILTER_CHANGE,
                payload: filter_types.table
            });
            dispatch(fetchManagers());
        });
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
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.delete(`${ROOT_URL}/${id}`, options);
    return {
        type: TABLE_DELETE,
        payload: request
    }
}

export function deleteEmployee(id) {
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.delete(`${EMPLOYEE_URL}/${id}`, options);
    return {
        type: EMPLOYEE_DELETE,
        payload: request
    }
}

export function fetchTables() {
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.get(`${ROOT_URL}`, options);
    return {
        type: TABLE_FETCH,
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
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.put(`${EMPLOYEE_URL}/${id}`, form, options);
    return {
        type: EMPLOYEE_UPDATE,
        payload: request
    }
}

export function fetchEmployee(id) {
    const request = axios.get(`${EMPLOYEE_URL}/${id}`, { headers: { authorization: localStorage.getItem('token') } } );
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
    const request = axios.get(EMPLOYEE_URL, { headers: { authorization: localStorage.getItem('token') } } );
    return {
        type: EMPLOYEES_FETCH,
        payload: request
    }
}

export function fetchManagers() {
    const options = { headers: { authorization: localStorage.getItem('ownerToken') } };
    const request = axios.get(OWNER_URL, options);
    console.log('=====================request results of featchManagers ==========================================')
    console.log(request);
    return {
        type: MANAGERS_FETCH,
        payload: request
    }
}

export function postHours(beginning, end) {
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.post(ROOT_URL, {beginning, end}, options);
    return {
        type: POST_HOURS,
        payload: request
    }
}

export function saveTable(hours) {
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.put(`${ROOT_URL}/${hours.data._id}`, hours.data, options);
    return {
        type: SAVE_TABLE,
        payload: {hours}
    }
}

export function addComment(comment, employee) {
    return function(dispatch) {
        dispatch({
            type: COMMENT_ADD,
            payload: {comment: comment, employee: employee, id: v4() }
        });
        dispatch({
            type: COMMENT_TEXT_INPUT,
            payload: ''
        });
    } 
}

export function commentClear(id) {
    return {
        type: COMMENT_CLEAR,
        payload: id
    }
}

export function addCommentEmployee(employee) {
    return {
        type: COMMENT_ADD_EMPLOYEE,
        payload: employee
    }
}

export function onTextInput(text) {
    return {
        type: COMMENT_TEXT_INPUT,
        payload: text
    }
}

export function fetchTableData(id) {
    const options = { headers: { authorization: localStorage.getItem('token') } };
    const request = axios.get(`${ROOT_URL}/${id}`, options);
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





