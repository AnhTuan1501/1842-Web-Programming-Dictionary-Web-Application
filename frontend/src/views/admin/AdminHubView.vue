<script setup>
import { ref } from 'vue'

import AuditLogsSection from './AuditLogsSection.vue'
import ReportHandlingSection from './ReportHandlingSection.vue'

const activeSection = ref('')
</script>

<template>
    <div class="container">
        <h1 class="mb-4">
            Admin Hub
        </h1>

        <div class="row g-3">
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            User Management
                        </h5>

                        <p class="card-text">
                            Manage registered users and their roles.
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

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            Report Handling
                        </h5>

                        <p class="card-text">
                            Review and manage vocabulary reports.
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="activeSection = 'reports'"
                        >
                            View Reports
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            Audit Logs
                        </h5>

                        <p class="card-text">
                            Review system activity and administrative actions.
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="activeSection = 'audit'"
                        >
                            View Audit Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="activeSection === 'reports'"
            class="mt-5"
        >
            <hr class="mb-5">

            <ReportHandlingSection />
        </div>

        <div
            v-if="activeSection === 'audit'"
            class="mt-5"
        >
            <hr class="mb-5">

            <AuditLogsSection />
        </div>
    </div>
</template>