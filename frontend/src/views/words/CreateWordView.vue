<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { apiCreateWord } from '../../services/wordApi';

const router = useRouter()

const word = ref('')
const meaning = ref('')
const example = ref('')
const synonyms = ref('')
const language = ref('')
const errorMessage = ref('')

async function addWord() {
    try {
        errorMessage.value = ''

        const response = await apiCreateWord({
        word: word.value,
        meaning: meaning.value,
        example: example.value,
        synonyms: synonyms.value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean),
        language: language.value
    })

        router.push(`/words/${response.data._id}`)
    } catch (error) {
        errorMessage.value =
            error.response?.data?.errors?.join(' ') ||
            error.response?.data?.message ||
            'Failed to create word.'
    }
}

</script>

<template>
    <h1>Create Word</h1>
    <div v-if="errorMessage" class="alert alert-danger">
    {{ errorMessage }}
    </div>
    <form @submit.prevent="addWord">
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
            <select v-model="language" class="form-select">
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="French">French</option>
        </select>
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-success me-2">Create</button>
            <RouterLink to="/words" class="btn btn-primary me-2">Cancel</RouterLink>
        </div>
    </form>
</template>