// npm install axios

import api from './api'

export function apiLogin(accountData) {
    return api.post('/auth/login', accountData)
}

export function apiRegister(accountData) {
    return api.post('/auth/register', accountData)
}