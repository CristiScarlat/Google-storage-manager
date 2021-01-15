import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://storage.googleapis.com/storage/v1/b'
});

const request = async (method, url, parameters) => {
    const token = localStorage.getItem('access_token');
    // Alter defaults after instance has been created
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    const params = {
        key: process.env.REACT_APP_GOOGLE_API_KEY,
        project: process.env.REACT_APP_GOOGLE_APP_ID,
        ...parameters
    }   

    switch(method){
        case 'get':
            return await instance.get(url, { params });
        default:
            break;
    }
}

export { request }