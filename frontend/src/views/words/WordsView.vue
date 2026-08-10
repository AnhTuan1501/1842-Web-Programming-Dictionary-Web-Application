<script setup>
import { ref, onMounted } from 'vue'
import { apiGetWords, apiDeleteWord } from '../../services/wordApi'
import { isAdmin } from '../../services/auth'

const words = ref([])

async function loadWords() {
    const response = await apiGetWords()
    words.value = response.data
}

async function removeWord(id) {
    const confirmed = confirm('Are you sure to delete this word?')

    if (!confirmed)
        return

    await apiDeleteWord(id)

    words.value = words.value.filter(
        word => word._id !== id
    )
}

onMounted(loadWords)
</script>

<template>
    <div>
        <h1>Dictionary</h1>

        <RouterLink v-if="isAdmin" to="/words/create" class="btn btn-success mb-3">
            Create
        </RouterLink>

        <table class="table table-hover">
            <tr>
                <th>Word</th>
                <th>Language</th>
                <th>Action</th>
            </tr>
            <tr v-for="word in words" :key="word._id">
                <td>{{ word.word }}</td>
                <td>{{ word.language }}</td>
                <td>
                    <RouterLink :to="{
                        name: 'word-details',
                        params: { id: word._id }
                    }" class="btn btn-primary btn-sm me-2">
                        Details
                    </RouterLink>
                    <RouterLink v-if="isAdmin" :to="`/words/${word._id}/edit`" class="btn btn-warning btn-sm me-2">
                        Edit
                    </RouterLink>
                    <button v-if="isAdmin" @click="removeWord(word._id)" class="btn btn-danger btn-sm me-2">
                        Delete
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>