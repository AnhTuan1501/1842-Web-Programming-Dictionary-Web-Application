<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const reports = ref([])
const errorMessage = ref('')

async function loadReports() {
    try {
        errorMessage.value = ''

        const response = await api.get('/reports')

        reports.value = response.data
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load reports.'
    }
}

async function resolveReport(id) {
    try {
        await api.put(`/reports/${id}/resolve`)

        await loadReports()
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Failed to resolve report.'
    }
}

async function rejectReport(id) {
    try {
        await api.put(`/reports/${id}/reject`)

        await loadReports()
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Failed to reject report.'
    }
}

onMounted(loadReports)
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>Report Handling</h2>

            <button
                type="button"
                class="btn btn-secondary"
                @click="loadReports"
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
            v-if="!reports.length && !errorMessage"
            class="alert alert-info"
        >
            No reports found.
        </div>

        <div
            v-if="reports.length"
            class="table-responsive"
        >
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Word</th>
                        <th>Reason</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="report in reports"
                        :key="report._id"
                    >
                        <td>
                            {{ new Date(report.createdAt).toLocaleString() }}
                        </td>

                        <td>
                            {{ report.userId?.name || 'Unknown User' }}
                        </td>

                        <td>
                            {{ report.wordId?.word || '-' }}
                        </td>

                        <td>
                            {{ report.reason }}
                        </td>

                        <td>
                            {{ report.description }}
                        </td>

                        <td>
                            <span
                                class="badge"
                                :class="{
                                    'bg-warning text-dark':
                                        report.status === 'pending',
                                    'bg-success':
                                        report.status === 'resolved',
                                    'bg-danger':
                                        report.status === 'rejected'
                                }"
                            >
                                {{ report.status }}
                            </span>
                        </td>

                        <td>
                            <template v-if="report.status === 'pending'">
                                <button
                                    type="button"
                                    class="btn btn-success btn-sm me-2"
                                    @click="resolveReport(report._id)"
                                >
                                    Resolve
                                </button>

                                <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="rejectReport(report._id)"
                                >
                                    Reject
                                </button>
                            </template>

                            <span
                                v-else
                                class="text-muted"
                            >
                                No action
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>