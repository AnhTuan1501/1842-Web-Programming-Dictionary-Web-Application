<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { apiGetBook, apiEditBook } from '../../services/bookApi';

const route = useRoute()
const router = useRouter()
const title = ref('')
const author = ref('')

async function loadBook() {
    const response = await apiGetBook(route.params.id)

    title.value = response.data.title
    author.value = response.data.author
}

async function updateBook() {
    const response = await apiEditBook(
        route.params.id,
        {
            title: title.value,
            author: author.value
        }
    )

    router.push(`/books/${response.data._id}`)
}

onMounted(loadBook)
</script>

<template>
    <h1>Update Book</h1>
    <form @submit.prevent="updateBook">
        <div class="mb-3">
            <label for="">Title</label>
            <input type="text" v-model="title" class="form-control">
        </div>

        <div class="mb-3">
            <label for="">Author</label>
            <input type="text" v-model="author" class="form-control">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-success me-2">Update</button>
            <RouterLink to="/books" class="btn btn-primary me-2">Cancel</RouterLink>
        </div>
    </form>
</template>