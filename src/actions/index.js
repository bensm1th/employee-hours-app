import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/hours';

export function getHours(beginning, end) {
    const request = axios.post(ROOT_URL, {beginning, end});
    
    return {
        type: 'GET_HOURS',
        payload: request
    };
}

