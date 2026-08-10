<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { apiGetWord, apiEditWord } from '../../services/wordApi';

const route = useRoute()
const router = useRouter()
const word = ref('')
const meaning = ref('')
const example = ref('')
const synonyms = ref('')
const language = ref('')
const errorMessage = ref('')

async function loadWord() {
    const response = await apiGetWord(route.params.id)

    word.value = response.data.word
    meaning.value = response.data.meaning
    example.value = response.data.example
    synonyms.value = response.data.synonyms
    language.value = response.data.language
}

async function updateWord() {
    try {
        errorMessage.value = ''
        const response = await apiEditWord(
            route.params.id,
            {
                word: word.value,
                meaning: meaning.value,
                example: example.value,
                synonyms: synonyms.value
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean),
                language: language.value
            }
        )

        router.push(`/words/${response.data._id}`)
    } catch (error) {
        errorMessage.value =
            error.response?.data?.errors?.join(' ') ||
            error.response?.data?.message ||
            'Failed to update word.'
    }
}

onMounted(loadWord)
</script>

<template>
    <h1>Update Word</h1>
    <div v-if="errorMessage" class="alert alert-danger">
    {{ errorMessage }}
    </div>
    <form @submit.prevent="updateWord">
        <div class="mb-3">
            <label for="">Word</label>
            <input type="text" v-model="word" class="form-control">
        </div>

        <div class="mb-3">
            <label for="">Definition</label>
            <input type="text" v-model="meaning" class="form-control">
        </div>

        <div class="mb-3">
            <label for="">Example</label>
            <input type="text" v-model="example" class="form-control">
        </div>

        <div class="mb-3">
            <label for="">Synonyms</label>
            <input type="text" v-model="synonyms" class="form-control">
        </div>
             <div class="mb-3">
            <label for="">Language</label>
            <input type="text" v-model="language" class="form-control">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-success me-2">Update</button>
            <RouterLink to="/words" class="btn btn-primary me-2">Cancel</RouterLink>
        </div>
    </form>
</template>