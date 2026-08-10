<script setup>
import { ref, onMounted, watch } from 'vue'
import { apiGetWords, apiDeleteWord } from '../../services/wordApi'
import { isAdmin } from '../../services/auth'
import { useRoute } from 'vue-router'

const route = useRoute()
const words = ref([])
const search = ref('')
const searchResults = ref([])
const language = ref(route.query.language || '')
const sort = ref('')

async function loadWords() {
    const response = await apiGetWords('', language.value)
    words.value = response.data

    watch(
    () => route.query.language,
    async (newLanguage) => {
        language.value = newLanguage || ''

        const response = await apiGetWords('', language.value)
        words.value = response.data
    }
)
}

let searchTimeout = null

function handleSearch() {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(async () => {
        if (!search.value.trim()) {
            searchResults.value = []
            return
        }
    const response = await apiGetWords(
        search.value,
        language.value
    )
    searchResults.value = response.data
    }, 100)
}

function handleSort() {
    if (sort.value === 'az') {
        words.value = [...words.value].sort((a, b) =>
            a.word.localeCompare(b.word)
        )
    }

    if (sort.value === 'za') {
        words.value = [...words.value].sort((a, b) =>
            b.word.localeCompare(a.word)
        )
    }
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
       <h2> {{ language || 'Dictionary' }} Dictionary </h2>
    <div class="position-relative mb-3">
        <input
            type="text"
            v-model="search"
            @input="handleSearch"
            class="form-control mb-2"
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
        <select
                v-model="sort"
                @change="handleSort"
                class="form-select mb-3"
            >
                <option value="">Default Order</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
        </select>
  
    </div>

    <RouterLink
        v-if="isAdmin"
        to="/words/create"
        class="btn btn-success mb-3"
    >
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
            <tr
                v-for="word in words"
                :key="word._id"
            >
                <td>{{ word.word }}</td>
                <td>{{ word.language }}</td>

                <td>
                    <RouterLink
                        :to="{
                            name: 'word-details',
                            params: { id: word._id }
                        }"
                        class="btn btn-primary btn-sm me-2"
                    >
                        Details
                    </RouterLink>

                    <RouterLink
                        v-if="isAdmin"
                        :to="`/words/${word._id}/edit`"
                        class="btn btn-warning btn-sm me-2"
                    >
                        Edit
                    </RouterLink>

                    <button
                        v-if="isAdmin"
                        @click="removeWord(word._id)"
                        class="btn btn-danger btn-sm me-2"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>