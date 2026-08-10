import api from './api'

export function apiGetWords(search = '') {
    return api.get('/words', {
        params: {
            search
        }
    })
}

export function apiGetWord(id) {
    return api.get(`/words/${id}`)
}

export function apiCreateWord(wordData) {
    return api.post('/words', wordData)
}

export function apiEditWord(id, wordData) {
    return api.put(`/words/${id}`, wordData)
}

export function apiDeleteWord(id) {
    return api.delete(`/words/${id}`)
}