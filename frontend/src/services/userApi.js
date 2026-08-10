import api from './api'

export function apiGetFavourites() {
    return api.get('/users/favourites')
}

export function apiAddFavourite(wordId) {
    return api.post(`/users/favourites/${wordId}`)
}

export function apiRemoveFavourite(wordId) {
    return api.delete(`/users/favourites/${wordId}`)
}

export async function apiAddRecent(wordId) {
    return api.post(`/users/recent/${wordId}`)
}

export async function apiGetRecents() {
    return api.get('/users/recent')
}