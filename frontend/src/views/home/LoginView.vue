<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import api from '../../services/api'
import { saveLogin } from '../../services/auth'
import { apiLogin } from "../../services/authApi";

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function login() {
    try {
        errorMessage.value = ''

        const response = await apiLogin(
            {
                email: email.value,
                password: password.value
            }
        )

        saveLogin(
            response.data.token,
            response.data.user
        )

        router.push('/words')
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Login failed'
    }
}
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Login</h1>

            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="login">
                <div class="mb-3">
                    <label class="form-label">
                        Email
                    </label>

                    <input v-model="email" type="email" class="form-control" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">
                        Password
                    </label>

                    <input v-model="password" type="password" class="form-control" required>
                </div>

                <button type="submit" class="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>