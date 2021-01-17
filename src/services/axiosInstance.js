import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
});



const request = async (method, url, parameters, headers) => {
    const token = localStorage.getItem('access_token');
    // Alter defaults after instance has been created
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    instance.defaults.headers.common['Content-type'] = 'image/jpeg';  

    const params = {
        key: process.env.REACT_APP_GOOGLE_API_KEY,
        project: process.env.REACT_APP_GOOGLE_APP_ID,
        ...parameters
    }   

    switch(method){
        case 'get':
            return await instance.get(url, { params });
        case 'post':
            return await instance.post(url, { params });
        default:
            break;
    }
}

export { request }