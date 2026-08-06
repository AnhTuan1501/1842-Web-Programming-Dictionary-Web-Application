// npm install axios

import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    //baseURL: 'http://localhost:2222/api'
})

api.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },

    function (error) {
        return Promise.reject(error)
    }
)

export default api