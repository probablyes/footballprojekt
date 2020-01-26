import axios from 'axios';

const baseURL = 'http://localhost:3001/user';
const defaultRequestHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    mode: 'no-cors',
};

export const getRecordList = () => {
    const promise = axios.get(baseURL, {
        headers: defaultRequestHeaders
    });
    return promise;
}

export const getConformLogin = (credentials) => {
    const url = `${baseURL}`;
    console.log(credentials)
    const promise = axios.post(url,credentials, { headers: defaultRequestHeaders });
    return promise;
}
