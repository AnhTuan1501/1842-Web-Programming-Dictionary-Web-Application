<script setup>
import { ref } from 'vue'

import {
    apiGetFavourites,
    apiGetRecents
} from '../../services/userApi'

import {
    apiGetWords
} from '../../services/wordApi'

import FlashcardSection from './FlashcardSection.vue'
import QuizSection from './QuizSection.vue'

const selectedLanguage = ref('')
const selectedSource = ref('')
const selectedMode = ref('')

const words = ref([])
const errorMessage = ref('')

async function loadWords(source) {
    try {
        errorMessage.value = ''
        words.value = []

        if (source === 'recent') {
            const response = await apiGetRecents()

            words.value = response.data
                .map(item => item.wordId || item)
                .filter(
                    word =>
                        word.language === selectedLanguage.value
                )
                .slice(0, 20)
        }

        if (source === 'favourite') {
            const response = await apiGetFavourites()

            words.value = response.data
                .map(item => item.wordId || item)
                .filter(
                    word =>
                        word.language === selectedLanguage.value
                )
                .slice(0, 20)
        }

        if (source === 'all') {
            const response = await apiGetWords(
                '',
                selectedLanguage.value
            )

            words.value = response.data.slice(0, 20)
        }
    } catch (error) {
        console.error(
            'LOAD LEARNING WORDS ERROR:',
            error
        )

        errorMessage.value =
            error.response?.data?.message ||
            error.message ||
            'Failed to load learning words.'
    }
}

async function selectLanguage(language) {
    selectedLanguage.value = language

    selectedSource.value = ''
    selectedMode.value = ''

    words.value = []
    errorMessage.value = ''
}

async function selectSource(source) {
    selectedSource.value = source
    selectedMode.value = ''

    await loadWords(source)
}

function selectMode(mode) {
    if (!words.value.length) {
        errorMessage.value =
            'No vocabulary is available for this learning mode.'

        return
    }

    errorMessage.value = ''
    selectedMode.value = mode
}

function resetLearning() {
    selectedLanguage.value = ''
    selectedSource.value = ''
    selectedMode.value = ''

    words.value = []
    errorMessage.value = ''
}
</script>

<template>
    <div>
        <!-- Header -->
        <div
            class="d-flex justify-content-between align-items-center mb-4"
        >
            <h2 class="mb-0">
                Learning
            </h2>

            <button
                v-if="selectedLanguage"
                type="button"
                class="btn btn-secondary"
                @click="resetLearning"
            >
                Start Over
            </button>
        </div>

        <!-- Language -->
        <div class="mb-4">
            <h4 class="mb-3">
                Choose Language
            </h4>

            <div class="row g-3">
                <div class="col-md-4">
                    <button
                        type="button"
                        class="btn w-100"
                        :class="
                            selectedLanguage === 'English'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="selectLanguage('English')"
                    >
                        English
                    </button>
                </div>

                <div class="col-md-4">
                    <button
                        type="button"
                        class="btn w-100"
                        :class="
                            selectedLanguage === 'Vietnamese'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="selectLanguage('Vietnamese')"
                    >
                        Vietnamese
                    </button>
                </div>

                <div class="col-md-4">
                    <button
                        type="button"
                        class="btn w-100"
                        :class="
                            selectedLanguage === 'French'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="selectLanguage('French')"
                    >
                        French
                    </button>
                </div>
            </div>
        </div>

        <!-- Vocabulary Source -->
        <div
            v-if="selectedLanguage"
            class="mb-4"
        >
            <h4 class="mb-3">
                Choose Vocabulary
            </h4>

            <div class="row g-3">
                <div class="col-md-4">
                    <button
                        type="button"
                        class="btn w-100"
                        :class="
                            selectedSource === 'all'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="selectSource('all')"
                    >
                        All Words
                    </button>
                </div>

                <div class="col-md-4">
                    <button
                        type="button"
                        class="btn w-100"
                        :class="
                            selectedSource === 'recent'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="selectSource('recent')"
                    >
                        Recent Words
                    </button>
                </div>

                <div class="col-md-4">
                    <button
                        type="button"
                        class="btn w-100"
                        :class="
                            selectedSource === 'favourite'
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        "
                        @click="selectSource('favourite')"
                    >
                        Favourite Words
                    </button>
                </div>
            </div>
        </div>

        <!-- Error -->
        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>

        <!-- Word Count -->
        <div
            v-if="selectedSource && words.length"
            class="alert alert-info"
        >
            {{ words.length }} word(s) available for learning.
        </div>

        <!-- No Words -->
        <div
            v-if="selectedSource && !words.length && !errorMessage"
            class="alert alert-warning"
        >
            No words are available for the selected language and vocabulary source.
        </div>

        <!-- Learning Mode -->
        <div
            v-if="selectedSource && words.length"
            class="mt-4"
        >
            <h4 class="mb-3">
                Choose Learning Mode
            </h4>

            <div class="row g-3">
                <div class="col-md-6">
                    <button
                        type="button"
                        class="btn btn-outline-primary w-100 py-3"
                        :class="{
                            active: selectedMode === 'flashcards'
                        }"
                        @click="selectMode('flashcards')"
                    >
                        <strong>
                            Flashcards
                        </strong>

                        <br>

                        <small>
                            Review words, meanings and examples.
                        </small>
                    </button>
                </div>

                <div class="col-md-6">
                    <button
                        type="button"
                        class="btn btn-outline-success w-100 py-3"
                        :class="{
                            active: selectedMode === 'quiz'
                        }"
                        @click="selectMode('quiz')"
                    >
                        <strong>
                            Quiz
                        </strong>

                        <br>

                        <small>
                            Test your vocabulary knowledge.
                        </small>
                    </button>
                </div>
            </div>
        </div>

        <!-- Flashcards -->
        <div
            v-if="selectedMode === 'flashcards'"
            class="mt-4"
        >
            <FlashcardSection
                :words="words"
            />
        </div>

        <!-- Quiz -->
        <div
            v-if="selectedMode === 'quiz'"
            class="mt-4"
        >
            <QuizSection
                :words="words"
            />
        </div>
    </div>
</template>