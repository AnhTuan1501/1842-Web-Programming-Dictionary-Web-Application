import api from './api'

export function apiGetWords(search = '', language = '') {
    return api.get('/words', {
        params: {
            search,
            language
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

export async function apiBulkDeleteWords(ids) {
    return api.delete('/words/bulk', {
        data: {
            ids
        }
    })
}