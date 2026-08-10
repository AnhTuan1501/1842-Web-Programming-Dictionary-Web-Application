<script setup>
import { ref, onMounted } from 'vue'
import { apiGetUsers } from '../../services/userApi'

const users = ref([])
const errorMessage = ref('')

async function loadUsers() {
    try {
        errorMessage.value = ''

        const response = await apiGetUsers()

        users.value = response.data
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load users.'
    }
}

onMounted(loadUsers)
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>User Management</h2>

            <button
                type="button"
                class="btn btn-secondary"
                @click="loadUsers"
            >
                Refresh
            </button>
        </div>

        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>

        <div
            v-if="!users.length && !errorMessage"
            class="alert alert-info"
        >
            No users found.
        </div>

        <div
            v-if="users.length"
            class="table-responsive"
        >
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="user in users"
                        :key="user._id"
                    >
                        <td>
                            {{ user.name }}
                        </td>

                        <td>
                            {{ user.email }}
                        </td>

                        <td>
                            <span
                                class="badge"
                                :class="
                                    user.role === 'admin'
                                        ? 'bg-dark'
                                        : 'bg-primary'
                                "
                            >
                                {{ user.role }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>