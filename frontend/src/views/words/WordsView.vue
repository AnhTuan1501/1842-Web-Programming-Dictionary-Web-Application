<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {apiGetWords,apiDeleteWord,apiBulkDeleteWords} from '../../services/wordApi'
import {apiGetRecents,apiGetFavourites} from '../../services/userApi'
import {isAdmin,isLoggedIn} from '../../services/auth'

const route = useRoute()
const words = ref([])
const search = ref('')
const searchResults = ref([])
const language = ref(route.query.language || 'English')
const sort = ref('')
const filter = ref(route.query.view === 'recent' ||route.query.view === 'favourite'? route.query.view: 'all')
const selectedIds = ref([])
const errorMessage = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const totalWords = ref(0)
const limit = 10

let requestId = 0

async function loadWords(page = currentPage.value) {
    console.log(
        'LOAD WORDS:',
        'page =',
        page,
        'language =',
        language.value
    )

    const currentRequest = ++requestId

    try {
        errorMessage.value = ''

        const response = await apiGetWords(
            search.value,
            language.value,
            page,
            limit,
            sort.value
        )

        // Ignore old request results
        if (currentRequest !== requestId) {
            return
        }

        console.log(
            'RESPONSE PAGE:',
            response.data.page
        )

        words.value = response.data.words

        currentPage.value = response.data.page
        totalPages.value = response.data.totalPages
        totalWords.value = response.data.totalWords

    } catch (error) {
        if (currentRequest !== requestId) {
            return
        }

        console.error(
            'LOAD WORDS ERROR:',
            error
        )

        errorMessage.value =
            error.response?.data?.message ||
            error.message ||
            'Failed to load words.'
    }
}


async function goToPage(page) {
    if (
        page < 1 ||
        page > totalPages.value ||
        page === currentPage.value
    ) {
        return
    }

    console.log(
        'GO TO PAGE:',
        page
    )

    await loadWords(page)
}


let searchTimeout = null

function handleSearch() {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(async () => {
        if (!search.value.trim()) {
            searchResults.value = []
            return
        }

        try {
            const response = await apiGetWords(
                search.value,
                language.value,
                1,
                10
            )

            searchResults.value =
                response.data.words

        } catch (error) {
            console.error(
                'SEARCH WORDS ERROR:',
                error
            )
        }
    }, 100)
}


async function handleSort() {
    currentPage.value = 1

    await loadWords(1)
}


async function handleFilter() {
    const currentLanguage = language.value

    try {
        errorMessage.value = ''

        if (filter.value === 'all') {
            await loadWords(1)
            return
        }

        if (!isLoggedIn.value) {
            words.value = []
            totalPages.value = 1
            totalWords.value = 0
            currentPage.value = 1

            return
        }

        if (filter.value === 'recent') {
            const response = await apiGetRecents()

            words.value = response.data.filter(
                word =>
                    word.language === currentLanguage
            )

            totalPages.value = 1
            totalWords.value = words.value.length
            currentPage.value = 1

            return
        }

        if (filter.value === 'favourite') {
            const response = await apiGetFavourites()

            words.value = response.data.filter(
                word =>
                    word.language === currentLanguage
            )

            totalPages.value = 1
            totalWords.value = words.value.length
            currentPage.value = 1
        }

    } catch (error) {
        console.error(
            'FILTER WORDS ERROR:',
            error
        )

        errorMessage.value =
            error.response?.data?.message ||
            error.message ||
            'Failed to load filtered words.'
    }
}


async function removeWord(id) {
    const confirmed = confirm(
        'Are you sure to delete this word?'
    )

    if (!confirmed) {
        return
    }

    try {
        await apiDeleteWord(id)

        words.value = words.value.filter(
            word => word._id !== id
        )

        totalWords.value = Math.max(
            0,
            totalWords.value - 1
        )

    } catch (error) {
        console.error(
            'DELETE WORD ERROR:',
            error
        )

        errorMessage.value =
            error.response?.data?.message ||
            error.message ||
            'Failed to delete word.'
    }
}


watch(
    () => route.query.language,
    async newLanguage => {
        language.value =
            newLanguage || 'English'

        sort.value = ''
        currentPage.value = 1

        await handleFilter()
    }
)


watch(
    () => route.query.view,
    async newView => {
        if (
            newView === 'recent' ||
            newView === 'favourite'
        ) {
            filter.value = newView
        } else {
            filter.value = 'all'
        }

        sort.value = ''
        currentPage.value = 1

        await handleFilter()
    }
)


function toggleSelectAll() {
    if (
        selectedIds.value.length ===
        words.value.length
    ) {
        selectedIds.value = []

    } else {
        selectedIds.value =
            words.value.map(
                word => word._id
            )
    }
}


async function handleBulkDelete() {
    if (!selectedIds.value.length) {
        return
    }

    const confirmed = window.confirm(
        `Delete ${selectedIds.value.length} selected word(s)?`
    )

    if (!confirmed) {
        return
    }

    try {
        await apiBulkDeleteWords(
            selectedIds.value
        )

        selectedIds.value = []

        await handleFilter()

    } catch (error) {
        console.error(
            'BULK DELETE ERROR:',
            error
        )

        errorMessage.value =
            error.response?.data?.message ||
            'Failed to delete selected words.'
    }
}


onMounted(async () => {
    await handleFilter()
})

onMounted(async () => {
    await handleFilter()
})
</script>
<template>
    <div class="page-container">

        <!-- Page Header -->
        <div class="page-header">
            <h1>
                Dictionary
            </h1>

            <p>
                Search and explore vocabulary.
            </p>
        </div>


        <!-- Search -->
        <div class="search-container mb-3">

            <input
                v-model="search"
                type="text"
                class="form-control"
                placeholder="Search words..."
                @input="handleSearch"
            >

            <!-- Search Results -->
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
                        params: {
                            id: result._id
                        },
                        query: {
                            language:
                                route.query.language ||
                                'English'
                        }
                    }"
                    class="list-group-item list-group-item-action"
                >

                    <div>
                        <strong>
                            {{ result.word }}
                        </strong>

                        <div
                            v-if="
                                result.pronunciation &&
                                result.language !== 'Vietnamese'
                            "
                            class="word-list-pronunciation"
                        >
                            {{ result.pronunciation }}
                        </div>
                    </div>

                </RouterLink>

            </div>

        </div>


        <!-- Sort / Filter -->
        <div class="row g-2 mb-3">

            <!-- Sort -->
            <div class="col-md-6">

                <select
                    v-model="sort"
                    @change="handleSort"
                    class="form-select"
                >

                    <option value="">
                        Default Order
                    </option>

                    <option value="az">
                        A → Z
                    </option>

                    <option value="za">
                        Z → A
                    </option>

                </select>

            </div>


            <!-- Filter -->
            <div class="col-md-6">

                <select
                    v-model="filter"
                    @change="handleFilter"
                    class="form-select"
                >

                    <option value="all">
                        All Words
                    </option>

                    <option value="recent">
                        Recent Words
                    </option>

                    <option value="favourite">
                        Favourite Words
                    </option>

                </select>

            </div>

        </div>


        <!-- Admin Create -->
        <RouterLink
            v-if="isAdmin"
            :to="{
                path: '/words/create',
                query: {
                    language:
                        route.query.language ||
                        'English'
                }
            }"
            class="btn btn-success mb-3"
        >
            Create
        </RouterLink>


        <!-- Bulk Delete -->
        <div
            v-if="isAdmin && selectedIds.length"
            class="mb-3"
        >

            <button
                type="button"
                class="btn btn-danger"
                @click="handleBulkDelete"
            >
                Delete Selected
                ({{ selectedIds.length }})
            </button>

        </div>


        <!-- Words Table -->
        <div class="table-responsive">

            <table class="table table-hover">

                <thead>
                    <tr>

                        <!-- Select All -->
                        <th v-if="isAdmin">

                            <input
                                type="checkbox"
                                class="form-check-input"
                                :checked="
                                    words.length > 0 &&
                                    selectedIds.length ===
                                        words.length
                                "
                                @change="toggleSelectAll"
                            >

                        </th>


                        <th>
                            Word
                        </th>


                        <th>
                            Definition
                        </th>


                        <th>
                            Action
                        </th>

                    </tr>
                </thead>


                <tbody>

                    <tr
                        v-for="word in words"
                        :key="word._id"
                    >

                        <!-- Individual Checkbox -->
                        <td v-if="isAdmin">

                            <input
                                type="checkbox"
                                class="form-check-input"
                                :value="word._id"
                                v-model="selectedIds"
                            >

                        </td>


                        <!-- Word + Pronunciation -->
                        <td>

                            <div>

                                <strong>
                                    {{ word.word }}
                                </strong>

                                <div
                                    v-if="
                                        word.pronunciation &&
                                        word.language !== 'Vietnamese'
                                    "
                                    class="word-list-pronunciation"
                                >
                                    {{ word.pronunciation }}
                                </div>

                            </div>

                        </td>


                        <!-- Definition -->
                        <td>

                            <span>
                                {{ word.meaning }}
                            </span>

                        </td>


                        <!-- Actions -->
                        <td>

                            <RouterLink
                                :to="{
                                    name: 'word-details',
                                    params: {
                                        id: word._id
                                    },
                                    query: {
                                        language:
                                            route.query.language ||
                                            'English'
                                    }
                                }"
                                class="btn btn-primary btn-sm me-2"
                            >
                                Details
                            </RouterLink>


                            <RouterLink
                                v-if="isAdmin"
                                :to="{
                                    path:
                                        `/words/${word._id}/edit`,
                                    query: {
                                        language:
                                            route.query.language ||
                                            'English'
                                    }
                                }"
                                class="btn btn-warning btn-sm me-2"
                            >
                                Edit
                            </RouterLink>


                            <button
                                v-if="isAdmin"
                                type="button"
                                class="btn btn-danger btn-sm me-2"
                                @click="
                                    removeWord(word._id)
                                "
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>


        <!-- Pagination -->
        <div
            v-if="
                filter === 'all' &&
                totalPages > 1
            "
            class="d-flex justify-content-between align-items-center mt-3"
        >

            <button
                type="button"
                class="btn btn-secondary"
                :disabled="currentPage === 1"
                @click="
                    goToPage(currentPage - 1)
                "
            >
                Previous
            </button>


            <span class="text-muted">
                Page
                {{ currentPage }}
                of
                {{ totalPages }}
            </span>


            <button
                type="button"
                class="btn btn-secondary"
                :disabled="
                    currentPage === totalPages
                "
                @click="
                    goToPage(currentPage + 1)
                "
            >
                Next
            </button>

        </div>


        <!-- Word Count -->
        <div
            v-if="
                filter === 'all' &&
                totalWords
            "
            class="text-muted text-center mt-2"
        >

            Showing
            {{ words.length }}
            of
            {{ totalWords }}
            words

        </div>


        <!-- No Words -->
        <div
            v-if="!words.length"
            class="alert alert-info mt-3"
        >
            No words found.
        </div>

    </div>
</template>