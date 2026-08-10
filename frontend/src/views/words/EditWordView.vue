<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
    apiGetWord,
    apiEditWord
} from '../../services/wordApi'

const route = useRoute()
const router = useRouter()

const word = ref('')
const pronunciation = ref('')
const meaning = ref('')
const example = ref('')
const synonyms = ref('')
const language = ref('')
const errorMessage = ref('')

async function loadWord() {
    try {
        const response = await apiGetWord(
            route.params.id
        )

        word.value = response.data.word
        pronunciation.value =
            response.data.pronunciation || ''
        meaning.value = response.data.meaning
        example.value = response.data.example
        synonyms.value =
            response.data.synonyms.join(', ')
        language.value = response.data.language

    } catch (error) {
        console.error(
            'LOAD WORD ERROR:',
            error
        )

        errorMessage.value =
            error.response?.data?.message ||
            'Failed to load word.'
    }
}

async function updateWord() {
    try {
        errorMessage.value = ''

        const response = await apiEditWord(
            route.params.id,
            {
                word: word.value,
                pronunciation:
                    pronunciation.value,
                meaning: meaning.value,
                example: example.value,
                synonyms: synonyms.value
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean),
                language: language.value
            }
        )

        router.push({
            path: `/words/${response.data._id}`,
            query: {
                language:
                    route.query.language ||
                    'English'
            }
        })

    } catch (error) {
        errorMessage.value =
            error.response?.data?.errors?.join(' ') ||
            error.response?.data?.message ||
            'Failed to update word.'
    }
}

function cancelEdit() {
    router.push({
        path: '/words',
        query: {
            language:
                route.query.language ||
                'English'
        }
    })
}

onMounted(loadWord)
</script>

<template>
    <div class="page-container">

        <!-- Page Header -->
        <div class="page-header">
            <h1>
                Edit Word
            </h1>

            <p>
                Update the vocabulary information below.
            </p>
        </div>

        <!-- Error Message -->
        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>

        <!-- Edit Form -->
        <div class="card">
            <div class="card-body">

                <form @submit.prevent="updateWord">

                    <!-- Word -->
                    <div class="mb-3">
                        <label
                            for="word"
                            class="form-label"
                        >
                            Word
                        </label>

                        <input
                            id="word"
                            v-model="word"
                            type="text"
                            class="form-control"
                            maxlength="100"
                            required
                        >
                    </div>


                    <!-- Pronunciation -->
                    <div class="mb-3">
                        <label
                            for="pronunciation"
                            class="form-label"
                        >
                            Pronunciation
                        </label>

                        <input
                            id="pronunciation"
                            v-model="pronunciation"
                            type="text"
                            class="form-control"
                            placeholder="e.g. /əˈbændən/"
                            maxlength="100"
                        >

                        <small class="text-muted">
                            Enter the pronunciation using IPA notation.
                        </small>
                    </div>


                    <!-- Definition -->
                    <div class="mb-3">
                        <label
                            for="meaning"
                            class="form-label"
                        >
                            Definition
                        </label>

                        <input
                            id="meaning"
                            v-model="meaning"
                            type="text"
                            class="form-control"
                            maxlength="500"
                            required
                        >
                    </div>


                    <!-- Example -->
                    <div class="mb-3">
                        <label
                            for="example"
                            class="form-label"
                        >
                            Example
                        </label>

                        <input
                            id="example"
                            v-model="example"
                            type="text"
                            class="form-control"
                            maxlength="500"
                        >
                    </div>


                    <!-- Synonyms -->
                    <div class="mb-3">
                        <label
                            for="synonyms"
                            class="form-label"
                        >
                            Synonyms
                        </label>

                        <input
                            id="synonyms"
                            v-model="synonyms"
                            type="text"
                            class="form-control"
                            placeholder="e.g. leave, desert, forsake"
                        >

                        <small class="text-muted">
                            Separate synonyms with commas.
                        </small>
                    </div>


                    <!-- Language -->
                    <div class="mb-4">
                        <label
                            for="language"
                            class="form-label"
                        >
                            Language
                        </label>

                        <select
                            id="language"
                            v-model="language"
                            class="form-select"
                            required
                        >
                            <option value="">
                                Select language
                            </option>

                            <option value="English">
                                English
                            </option>

                            <option value="Vietnamese">
                                Vietnamese
                            </option>

                            <option value="French">
                                French
                            </option>
                        </select>
                    </div>


                    <!-- Actions -->
                    <div class="d-flex gap-2">

                        <button
                            type="submit"
                            class="btn btn-success"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="cancelEdit"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>
        </div>

    </div>
</template>