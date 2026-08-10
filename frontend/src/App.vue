<script setup>
import { useRouter, useRoute } from 'vue-router'

import {currentUser,isLoggedIn,isAdmin,logout} from './services/auth'

const router = useRouter()
const route = useRoute()

function handleLogout() {
    logout()
    router.push('/login')
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">
                Wordy
            </RouterLink>

            <div class="navbar-nav me-auto">
                <RouterLink class="nav-link" to="/">
                    Home
                </RouterLink>

                <RouterLink class="nav-link" to="/about">
                    About
                </RouterLink>

                <div class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                    >
                        Dictionary
                    </a>

                    <ul class="dropdown-menu">
                        <li>
                            <RouterLink
                                class="dropdown-item"
                                :class="{
                                    active: route.query.language === 'English'
                                }"
                                to="/words?language=English"
                            >
                                English Dictionary
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink
                                class="dropdown-item"
                                :class="{
                                    active: route.query.language === 'Vietnamese'
                                }"
                                to="/words?language=Vietnamese"
                            >
                                Vietnamese Dictionary
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink
                                class="dropdown-item"
                                :class="{
                                    active: route.query.language === 'French'
                                }"
                                to="/words?language=French"
                            >
                                French Dictionary
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="navbar-nav">
                <template v-if="isLoggedIn">
                    <span class="navbar-text me-3">
                        {{ currentUser.name }}
                        ({{ currentUser.role }})
                    </span>

                    <button
                        class="btn btn-outline-danger"
                        @click="handleLogout"
                    >
                        Logout
                    </button>
                </template>

                <template v-else>
                    <RouterLink class="nav-link" to="/login">
                        Login
                    </RouterLink>

                    <RouterLink class="nav-link" to="/register">
                        Register
                    </RouterLink>
                </template>
            </div>
        </div>
    </nav>

    <main class="container mt-3">
        <RouterView />
    </main>
</template>