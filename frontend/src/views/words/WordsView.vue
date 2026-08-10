<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { apiGetWords, apiDeleteWord } from '../../services/wordApi'
import { apiGetRecents, apiGetFavourites } from '../../services/userApi'
import { isAdmin, isLoggedIn } from '../../services/auth'

const route = useRoute()

const words = ref([])
const search = ref('')
const searchResults = ref([])
const language = ref(route.query.language || 'English')
const sort = ref('')
const filter = ref('all')

async function loadWords() {
    console.log('LOAD WORDS:', language.value)

    try {
        const response = await apiGetWords('', language.value)

        console.log('RESPONSE:', response)

        words.value = response.data
    } catch (error) {
        console.error('LOAD WORDS ERROR:', error)
    }
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

async function handleFilter() {
    const currentLanguage = language.value

    if (filter.value === 'all') {
        await loadWords()
        return
    }

    if (!isLoggedIn.value) {
        words.value = []
        return
    }

    if (filter.value === 'recent') {
        const response = await apiGetRecents()

        words.value = response.data.filter(
            word => word.language === currentLanguage
        )

        return
    }

    if (filter.value === 'favourite') {
        const response = await apiGetFavourites()

        words.value = response.data.filter(
            word => word.language === currentLanguage
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

watch(
    () => route.query.language,
    async (newLanguage) => {
        language.value = newLanguage || 'English'
        filter.value = 'all'
        sort.value = ''

        await loadWords()
    }
)

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
                params: { id: result._id },
                query: {
                    language: route.query.language || 'English'
                }
            }"
            class="list-group-item list-group-item-action"
        >
            {{ result.word }}
        </RouterLink>
        </div>
        <div class="row g-2 mb-3">
        <div class="col-md-6">
            <select
                v-model="sort"
                @change="handleSort"
                class="form-select"
            >
                <option value="">Default Order</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
            </select>
        </div>

        <div class="col-md-6">
            <select
                v-model="filter"
                @change="handleFilter"
                class="form-select"
            >
                <option value="all">All Words</option>
                <option value="recent">Recent Words</option>
                <option value="favourite">Favourite Words</option>
            </select>
        </div>
    </div>
    </div>

        <RouterLink
            v-if="isAdmin"
            :to="{
                path: '/words/create',
                query: {
                    language: route.query.language || 'English'
                }
            }"
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
                            params: { id: word._id },
                            query: {
                                language: route.query.language || 'English'
                            }
                        }"
                        class="btn btn-primary btn-sm me-2"
                    >
                        Details
                    </RouterLink>

                   <RouterLink
                        v-if="isAdmin"
                        :to="{
                            path: `/words/${word._id}/edit`,
                            query: {
                                language: route.query.language || 'English'
                            }
                        }"
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