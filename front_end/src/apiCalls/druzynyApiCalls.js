import axios from 'axios';

const baseURL = 'http://localhost:3001/druzyny';
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

export const getRecordDetailsCall = (recordId) => {
    const url = `${baseURL}/${recordId}`;
    const promise = axios.get(url, { headers: defaultRequestHeaders });
    return promise;
}

export const createRecordServerCall = (record) => {
    const promise = axios.post(baseURL, record, { headers: defaultRequestHeaders });
    return promise;
};

export const updateRecordCall = (record) => {
    const promise = axios.put(`${baseURL}/${record.id}`, record, { headers: defaultRequestHeaders });
    return promise;
}

export const deleteRecordCall = (record) => {
    const promise = axios.delete(`${baseURL}/${record}`, { headers: defaultRequestHeaders });
    return promise;
}
