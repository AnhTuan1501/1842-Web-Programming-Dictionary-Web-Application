<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const logs = ref([])
const errorMessage = ref('')

async function loadAuditLogs() {
    try {
        errorMessage.value = ''

        const response = await api.get('/audit-logs')

        logs.value = response.data
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load audit logs.'
    }
}

function formatDate(date) {
    return new Date(date).toLocaleString()
}

onMounted(loadAuditLogs)
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>Audit Logs</h2>

            <button
                type="button"
                class="btn btn-secondary"
                @click="loadAuditLogs"
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
            v-if="!logs.length && !errorMessage"
            class="alert alert-info"
        >
            No audit logs found.
        </div>

        <div
            v-if="logs.length"
            class="table-responsive"
        >
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Word</th>
                        <th>Details</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="log in logs"
                        :key="log._id"
                    >
                        <td>
                            {{ formatDate(log.createdAt) }}
                        </td>

                        <td>
                            {{ log.userId?.name || 'Unknown User' }}
                        </td>

                        <td>
                            <span class="badge bg-secondary">
                                {{ log.action }}
                            </span>
                        </td>

                        <td>
                            {{ log.wordId?.word || '-' }}
                        </td>

                        <td>
                            {{ log.details || '-' }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>