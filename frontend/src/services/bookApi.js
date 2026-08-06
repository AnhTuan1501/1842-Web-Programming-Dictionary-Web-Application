import api from './api'

export function apiGetBooks() {
    return api.get('/books')
}

export function apiGetBook(id) {
    return api.get(`/books/${id}`)
}

export function apiCreateBook(bookData) {
    return api.post('/books', bookData)
}

export function apiEditBook(id, bookData) {
    return api.put(`/books/${id}`, bookData)
}

export function apiDeleteBook(id) {
    return api.delete(`/books/${id}`)
}