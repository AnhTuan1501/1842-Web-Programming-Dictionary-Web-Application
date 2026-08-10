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

function speakWord() {
    if (!word.value?.word) {
        return
    }

    window.speechSynthesis.cancel()

    const utterance =
        new SpeechSynthesisUtterance(
            word.value.word
        )

    if (word.value.language === 'English') {
        utterance.lang = 'en-US'
    }

    if (word.value.language === 'Vietnamese') {
        utterance.lang = 'vi-VN'
    }

    if (word.value.language === 'French') {
        utterance.lang = 'fr-FR'
    }

    window.speechSynthesis.speak(
        utterance
    )
}

onMounted(loadWord)
</script>

<template>
    <div class="page-container">

        <!-- Word Found -->
        <div v-if="word">

            <!-- Word Information -->
            <div class="word-detail">

                <!-- Word Header -->
                <div class="word-detail-header">

                    <h1 class="word-detail-word">
                        {{ word.word }}
                    </h1>

                    <div
                        v-if="word.pronunciation"
                        class="word-detail-pronunciation"
                    >
                        {{ word.pronunciation }}

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-primary ms-2"
                            @click="speakWord"
                        >
                            🔊 Listen
                        </button>
                    </div>

                </div>

                <hr>

                <!-- Meaning -->
                <div class="word-detail-section">

                    <h6>
                        Meaning
                    </h6>

                    <p class="word-detail-meaning">
                        {{ word.meaning }}
                    </p>

                </div>

                <!-- Example -->
                <div
                    v-if="word.example"
                    class="word-detail-section"
                >

                    <h6>
                        Example
                    </h6>

                    <p class="word-detail-example">
                        "{{ word.example }}"
                    </p>

                </div>

                <!-- Synonyms -->
                <div
                    v-if="word.synonyms?.length"
                    class="word-detail-section"
                >

                    <h6>
                        Synonyms
                    </h6>

                    <div class="d-flex flex-wrap gap-2">

                        <span
                            v-for="synonym in word.synonyms"
                            :key="synonym"
                            class="badge text-bg-light border"
                        >
                            {{ synonym }}
                        </span>

                    </div>

                </div>
        
                <!-- Language -->
                <div class="word-detail-section">

                    <h6>
                        Language
                    </h6>

                    <span class="badge bg-primary">
                        {{ word.language }}
                    </span>

                </div>
      
                <!-- Actions -->
                <div class="word-detail-actions" gap-3>

                    <!-- Back -->
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="goBackToDictionary"
                    >
                        ← Back
                    </button>

                    <!-- Favourite -->
                    <button
                        v-if="isLoggedIn"
                        type="button"
                        class="btn btn-outline-warning"
                        @click="toggleFavourite"
                    >
                        {{
                            isFavourite
                                ? '♥ Favourite'
                                : '♡ Add to Favourite'
                        }}
                    </button>

                    <!-- Report -->
                    <button
                        v-if="isLoggedIn"
                        type="button"
                        class="btn btn-outline-danger"
                        @click="showReportForm = !showReportForm"
                    >
                        ⚠ Report an Issue
                    </button>

                </div>

            </div>


            <!-- Report Form -->
            <div
                v-if="showReportForm"
                class="card mt-3 mb-3"
            >

                <div class="card-body">

                    <h5 class="card-title">
                        Report Vocabulary Issue
                    </h5>

                    <!-- Report Error -->
                    <div
                        v-if="reportError"
                        class="alert alert-danger"
                    >
                        {{ reportError }}
                    </div>

                    <!-- Report Success -->
                    <div
                        v-if="reportMessage"
                        class="alert alert-success"
                    >
                        {{ reportMessage }}
                    </div>

                    <!-- Reason -->
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

                    <!-- Description -->
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

                    <!-- Report Buttons -->
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

        </div>


        <!-- Word Not Found -->
        <div
            v-else
            class="empty-state"
        >
            <h4>
                Word Not Found
            </h4>

            <p>
                The requested word could not be found.
            </p>

            <button
                type="button"
                class="btn btn-primary"
                @click="goBackToDictionary"
            >
                ← Back to Dictionary
            </button>
        </div>

    </div>
</template>