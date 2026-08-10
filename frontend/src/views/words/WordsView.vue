<script setup>
import { ref, onMounted } from 'vue'
import { apiGetWords, apiDeleteWord } from '../../services/wordApi'
import { isAdmin } from '../../services/auth'

const words = ref([])
const search = ref('')
const searchResults = ref([])

async function loadWords() {
    const response = await apiGetWords()
    words.value = response.data
}

let searchTimeout = null

function handleSearch() {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(async () => {
        if (!search.value.trim()) {
            searchResults.value = []
            return
        }

        const response = await apiGetWords(search.value)
        searchResults.value = response.data
    }, 100)
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
        <div class="mb-3 position-relative">
    <input
        type="text"
        v-model="search"
        @input="handleSearch"
        class="form-control"
        placeholder="Search words..."
    >

    <div
        v-if="searchResults.length"
        class="list-group position-absolute w-100"
        style="z-index: 1000;"
    >
        <RouterLink
            v-for="result in searchResults"
            :key="result._id"
            :to="{
                name: 'word-details',
                params: { id: result._id }
            }"
            class="list-group-item list-group-item-action"
        >
            {{ result.word }}
        </RouterLink>
    </div>
</div>
        <RouterLink v-if="isAdmin" to="/words/create" class="btn btn-success mb-3">
            Create
        </RouterLink>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Word</th>
                    <th>Language</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
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
            </tbody>
        </table>
    </div>
</template>