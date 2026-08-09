<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../services/api'
import { saveLogin } from '../../services/auth'
import { apiRegister } from '../../services/authApi'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

async function register() {
    try {
        errorMessage.value = ''

        const response = await apiRegister(
            {
                name: name.value,
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
            'Registration failed'
    }
}
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Register</h1>

            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="register">
                <div class="mb-3">
                    <label class="form-label">
                        Name
                    </label>

                    <input v-model="name" type="text" class="form-control" required>
                </div>

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

                    <input v-model="password" type="password" class="form-control" minlength="6" required>
                </div>

                <button type="submit" class="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    </div>
</template>