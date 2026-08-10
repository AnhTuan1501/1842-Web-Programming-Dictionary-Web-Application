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
    <div class="app-wrapper">

        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg">
            <div class="container">

                <!-- Brand -->
                <RouterLink
                    class="navbar-brand"
                    to="/"
                >
                    Wordy
                </RouterLink>

                <!-- Mobile Toggle -->
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    id="mainNavbar"
                    class="collapse navbar-collapse"
                >

                    <!-- Left Navigation -->
                    <div class="navbar-nav me-auto">

                        <RouterLink
                            class="nav-link"
                            to="/"
                        >
                            Home
                        </RouterLink>

                        <!-- User Hub -->
                        <RouterLink
                            v-if="isLoggedIn && !isAdmin"
                            class="nav-link"
                            to="/user-hub"
                        >
                            User Hub
                        </RouterLink>

                        <!-- Admin Hub -->
                        <RouterLink
                            v-if="isAdmin"
                            class="nav-link"
                            to="/admin-hub"
                        >
                            Admin Hub
                        </RouterLink>

                        <!-- Dictionary -->
                        <div class="nav-item dropdown">

                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dictionary
                            </a>

                            <ul class="dropdown-menu">

                                <li>
                                    <RouterLink
                                        class="dropdown-item"
                                        :class="{
                                            active:
                                                route.query.language ===
                                                'English'
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
                                            active:
                                                route.query.language ===
                                                'Vietnamese'
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
                                            active:
                                                route.query.language ===
                                                'French'
                                        }"
                                        to="/words?language=French"
                                    >
                                        French Dictionary
                                    </RouterLink>
                                </li>

                            </ul>

                        </div>

                    </div>


                    <!-- Right Navigation -->
                    <div class="navbar-nav">

                        <!-- Logged In -->
                        <template v-if="isLoggedIn">

                            <span class="navbar-text me-3">
                                {{ currentUser.name }}
                                ({{ currentUser.role }})
                            </span>

                            <button
                                type="button"
                                class="btn btn-outline-danger"
                                @click="handleLogout"
                            >
                                Logout
                            </button>

                        </template>


                        <!-- Logged Out -->
                        <template v-else>

                            <RouterLink
                                class="nav-link"
                                to="/login"
                            >
                                Login
                            </RouterLink>

                            <RouterLink
                                class="nav-link"
                                to="/register"
                            >
                                Register
                            </RouterLink>

                        </template>

                    </div>

                </div>

            </div>
        </nav>


        <!-- Main Content -->
        <main class="container mt-3">
            <RouterView />
        </main>


        <!-- Footer -->
      <footer>
            <div class="container">

                <p class="mb-1">
                    © 2026 Wordy Dictionary
                </p>

                <small>
                    A multilingual vocabulary learning application.
                </small>

                <div class="mt-2">
                    <small>
                        Contact:
                        <a href="mailto:tuan.ho150105@gmail.com">
                            tuan.ho150105@gmail.com
                        </a>
                    </small>
                </div>

            </div>
        </footer>
    </div>
</template>