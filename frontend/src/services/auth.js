import { ref, computed } from 'vue'

const savedUser = localStorage.getItem('user')

export const currentUser = ref(
    savedUser ? JSON.parse(savedUser) : null
)

export const isLoggedIn = computed(
    () => currentUser.value !== null
)

export const isAdmin = computed(
    () => currentUser.value?.role === 'admin'
)

export function saveLogin(token, user) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    currentUser.value = user
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    currentUser.value = null
}