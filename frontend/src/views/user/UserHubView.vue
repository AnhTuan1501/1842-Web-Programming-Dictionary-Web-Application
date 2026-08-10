<script setup>
import { ref, onMounted } from 'vue'
import { apiGetMyReports } from '../../services/userApi'

const activeSection = ref('')
const reports = ref([])
const selectedReport = ref(null)
const errorMessage = ref('')

async function loadReports() {
    try {
        errorMessage.value = ''

        const response = await apiGetMyReports()

        reports.value = response.data
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load reports.'
    }
}

function getReportMessage(report) {
    if (report.status === 'pending') {
        return 'Your report is being reviewed by an administrator.'
    }

    if (report.status === 'resolved') {
        return 'Your report has been resolved.'
    }

    if (report.status === 'rejected') {
        return 'Your report has been rejected.'
    }

    return 'Your report status is unknown.'
}

function viewReport(report) {
    selectedReport.value = report
}

function closeReport() {
    selectedReport.value = null
}

async function showReports() {
    activeSection.value = 'reports'

    await loadReports()
}

onMounted(() => {
    if (activeSection.value === 'reports') {
        loadReports()
    }
})
</script>

<template>
    <div class="container">
        <h1 class="mb-4">
            User Hub
        </h1>

        <div class="row g-3">
            <!-- Favourites -->
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            Favourites
                        </h5>

                        <p class="card-text">
                            View your favourite vocabulary.
                        </p>

                        <RouterLink
                            to="/words?view=favourite"
                            class="btn btn-primary"
                        >
                            View Favourites
                        </RouterLink>
                    </div>
                </div>
            </div>

            <!-- Recently Viewed -->
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            Recently Viewed
                        </h5>

                        <p class="card-text">
                            View vocabulary you recently explored.
                        </p>

                        <RouterLink
                            to="/words?view=recent"
                            class="btn btn-primary"
                        >
                            View Recent
                        </RouterLink>
                    </div>
                </div>
            </div>

            <!-- Learning -->
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            Learning
                        </h5>

                        <p class="card-text">
                            Continue learning vocabulary.
                        </p>

                        <button
                            type="button"
                            class="btn btn-secondary"
                            disabled
                        >
                            Coming Soon
                        </button>
                    </div>
                </div>
            </div>

            <!-- My Reports -->
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            My Reports
                        </h5>

                        <p class="card-text">
                            View your vocabulary reports and their status.
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="showReports"
                        >
                            View My Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- My Reports Section -->
        <div
            v-if="activeSection === 'reports'"
            class="mt-5"
        >
            <hr class="mb-5">

            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2>
                    My Reports
                </h2>

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
                You have not submitted any reports.
            </div>

            <div
                v-for="report in reports"
                :key="report._id"
                class="card mb-3"
            >
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="card-title">
                                {{ report.wordId?.word || 'Unknown Word' }}
                            </h5>

                            <p class="card-text mb-2">
                                {{ getReportMessage(report) }}
                            </p>
                        </div>

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
                    </div>

                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="viewReport(report)"
                    >
                        View Report
                    </button>
                </div>
            </div>

            <!-- Selected Report -->
            <div
                v-if="selectedReport"
                class="card mt-4"
            >
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0">
                            Report Details
                        </h3>

                        <button
                            type="button"
                            class="btn btn-secondary btn-sm"
                            @click="closeReport"
                        >
                            Close
                        </button>
                    </div>

                    <div class="mb-2">
                        <strong>Word:</strong>
                        {{ selectedReport.wordId?.word || '-' }}
                    </div>

                    <div class="mb-2">
                        <strong>Language:</strong>
                        {{ selectedReport.wordId?.language || '-' }}
                    </div>

                    <div class="mb-2">
                        <strong>Reason:</strong>
                        {{ selectedReport.reason }}
                    </div>

                    <div class="mb-2">
                        <strong>Description:</strong>
                        {{ selectedReport.description }}
                    </div>

                    <div class="mb-2">
                        <strong>Status:</strong>
                        {{ selectedReport.status }}
                    </div>

                    <div>
                        <strong>Submitted:</strong>
                        {{ new Date(selectedReport.createdAt).toLocaleString() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>