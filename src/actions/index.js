import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/hours';
const EMPLOYEE_URL = 'http://localhost:3000/employee';
const TIMESTAMP_URL = 'http://localhost:3000/timestamp';

export function deleteEmployee(id) {
    request = axios.delete(`${EMPLOYEE_URL}/${id}`);
    return {
        type: 'EMPLOYEE_DELETE',
        payload: request
    }
}

export function fetchTables() {
    const request = axios.get(`${ROOT_URL}`);
    return {
        type: 'TABLE_FETCH',
        payload: request
    }
}

export function postEmployee(form) {
    const request = axios.post(`${EMPLOYEE_URL}/new`, form);
    return {
        type: 'EMPLOYEE_POST',
        payload: request
    }
}

export function clearLogState() {
    return {
        type: 'LOGSTATE_CLEAR',
        payload: {}
    }
}

export function onIdChange(change) {
    return {
        type: 'ID_CHANGE',
        payload: change
    }
}

export function postTimestamp(form) {
    const request = axios.post(`${TIMESTAMP_URL}`, form);
    return {
        type: 'TIMESTAMP_POST',
        payload: request
    }
}

export function updateEmployee(id, form) {
    const request = axios.put(`${EMPLOYEE_URL}/${id}`, form);
    return {
        type: 'EMPLOYEE_UPDATE',
        payload: request
    }
}

export function fetchEmployee(id) {
    const request = axios.get(`${EMPLOYEE_URL}/${id}`);
    return {
        type: 'EMPLOYEE_FETCH',
        payload: request
    }
}

export function fetchEmployees() {
    const request = axios.get(EMPLOYEE_URL);
    return {
        type: 'EMPLOYEES_FETCH',
        payload: request
    }
}

export function postHours(beginning, end) {
    const request = axios.post(ROOT_URL, {beginning, end});
    return {
        type: 'POST_HOURS',
        payload: request
    }
}

export function saveTable(hours) {
    const request = axios.put(`${ROOT_URL}/${hours.data._id}`, hours.data);
    return {
        type:'SAVE_TABLE',
        payload: {hours}
    }
}

export function fetchTableData(id) {
    const request = axios.get(`${ROOT_URL}/${id}`);
    return {
        type: 'GET_TABLE',
        payload: request
    }
}

export function cellClick(employeeId, date, id) {
    return {
        type: 'CELL_CLICKED',
        payload: {employeeId, date, id}
    }
}

export function cellBlur(employeeId, date, id) {
    return {
        type: 'CELL_BLUR',
        payload: {employeeId, date, id}
    }
}

export function updateHours(employeeId, date, id, update) {
    return {
        type: 'UPDATE_HOURS',
        payload: {employeeId, date, id, update}
    }
}





