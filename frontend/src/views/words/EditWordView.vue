<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { apiGetWord, apiEditWord } from '../../services/wordApi';

const route = useRoute()
const router = useRouter()
const word = ref('')
const meaning = ref('')

async function loadWord() {
    const response = await apiGetWord(route.params.id)

    word.value = response.data.word
    meaning.value = response.data.meaning
}

async function updateWord() {
    const response = await apiEditWord(
        route.params.id,
        {
            word: word.value,
            meaning: meaning.value
        }
    )

    router.push(`/words/${response.data._id}`)
}

onMounted(loadWord)
</script>

<template>
    <h1>Update Word</h1>
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
            <button type="submit" class="btn btn-success me-2">Update</button>
            <RouterLink to="/words" class="btn btn-primary me-2">Cancel</RouterLink>
        </div>
    </form>
</template>