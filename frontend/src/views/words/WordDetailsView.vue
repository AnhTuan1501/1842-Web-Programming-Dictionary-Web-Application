<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { apiGetWord } from '../../services/wordApi';
import {apiGetFavourites, apiAddFavourite, apiRemoveFavourite, apiAddRecent, apiCreateReport } from '../../services/userApi'
import { isLoggedIn } from '../../services/auth'

const route = useRoute()
const router = useRouter()  
const word = ref(null)
const isFavourite = ref(false)
const showReportForm = ref(false)
const reportReason = ref('')
const reportDescription = ref('')
const reportMessage = ref('')
const reportError = ref('')

async function loadWord() {
    const response = await apiGetWord(route.params.id)

    word.value = response.data

    if (isLoggedIn.value) {
        await apiAddRecent(word.value._id)

        const favourites = await apiGetFavourites()

        isFavourite.value = favourites.data.some(
            item => item._id === word.value._id
        )
    }
}

async function toggleFavourite() {
    if (isFavourite.value) {
        await apiRemoveFavourite(word.value._id)
        isFavourite.value = false
    } else {
        await apiAddFavourite(word.value._id)
        isFavourite.value = true
    }
}

function goBackToDictionary() {
    router.push({
        path: '/words',
        query: {
            language: route.query.language || 'English'
        }
    })
}

async function submitReport() {
    try {
        reportError.value = ''
        reportMessage.value = ''

        await apiCreateReport(
            word.value._id,
            reportReason.value,
            reportDescription.value
        )

        reportMessage.value = 'Report submitted successfully.'

        reportReason.value = ''
        reportDescription.value = ''
        showReportForm.value = false
    } catch (error) {
        reportError.value =
            error.response?.data?.errors?.join(' ') ||
            error.response?.data?.message ||
            'Failed to submit report.'
    }
}

onMounted(loadWord)
</script>

<template>
    <div>
        <h1>Word Details</h1>

        <div v-if="word">
            <!-- Actions -->
            <div
                v-if="isLoggedIn"
                class="d-flex gap-2 mb-3"
            >
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="showReportForm = !showReportForm"
                >
                    ⚠ Report an Issue
                </button>

                <button
                    type="button"
                    class="btn btn-outline-warning"
                    @click="toggleFavourite"
                >
                    {{ isFavourite ? '♥ Favourite' : '♡ Add to Favourite' }}
                </button>
            </div>

            <!-- Report Form -->
            <div
                v-if="showReportForm"
                class="card mb-3"
            >
                <div class="card-body">
                    <h5 class="card-title">
                        Report Vocabulary Issue
                    </h5>

                    <div
                        v-if="reportError"
                        class="alert alert-danger"
                    >
                        {{ reportError }}
                    </div>

                    <div
                        v-if="reportMessage"
                        class="alert alert-success"
                    >
                        {{ reportMessage }}
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Reason
                        </label>

                        <select
                            v-model="reportReason"
                            class="form-select"
                        >
                            <option value="">
                                Select reason
                            </option>

                            <option value="Incorrect meaning">
                                Incorrect meaning
                            </option>

                            <option value="Incorrect example">
                                Incorrect example
                            </option>

                            <option value="Typo">
                                Typo
                            </option>

                            <option value="Wrong language/category">
                                Wrong language/category
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Description
                        </label>

                        <textarea
                            v-model="reportDescription"
                            class="form-control"
                            rows="4"
                            placeholder="Describe the issue..."
                        ></textarea>
                    </div>

                    <button
                        type="button"
                        class="btn btn-danger me-2"
                        @click="submitReport"
                    >
                        Submit Report
                    </button>

                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="showReportForm = false"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <!-- Word Information -->
            <div>
                <div>
                    <strong>Word: </strong>
                    {{ word.word }}
                </div>

                <div>
                    <strong>Meaning: </strong>
                    {{ word.meaning }}
                </div>

                <div>
                    <strong>Example: </strong>
                    {{ word.example }}
                </div>

                <div>
                    <strong>Synonyms: </strong>

                    <span
                        v-for="(synonym, index) in word.synonyms"
                        :key="synonym"
                    >
                        {{ synonym }}<span
                            v-if="index < word.synonyms.length - 1"
                        >, </span>
                    </span>
                </div>

                <div>
                    <strong>Language: </strong>
                    {{ word.language }}
                </div>
            </div>
        </div>

        <div v-else>
            Word Not Found !!!
        </div>

        <button
            type="button"
            class="btn btn-primary mt-3"
            @click="goBackToDictionary"
        >
            Back
        </button>
    </div>
</template>