import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3500'
})

// Set authorization header for Axios requests
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ${token}';
        }
        return config;
    },
    error => Promise.reject(error)
);