<script setup>
import { useRouter } from 'vue-router'
import { currentUser, isLoggedIn, isAdmin, logout } from './services/auth'

const router = useRouter()

function handleLogout() {
    logout()
    router.push('/login')
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Full Stack Sample</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/about">About</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/words">Dictionary</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="navbar-nav">
                <template v-if="isLoggedIn">
                    <span class="navbar-text me-3">
                        {{ currentUser.name }}
                        ({{ currentUser.role }})
                    </span>

                    <button class="btn btn-outline-danger" @click="handleLogout">
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