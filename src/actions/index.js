import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/hours';

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
    console.log('clicked');
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



