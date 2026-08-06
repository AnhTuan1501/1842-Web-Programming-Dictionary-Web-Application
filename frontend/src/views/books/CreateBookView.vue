<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { apiCreateBook } from '../../services/bookApi';

const router = useRouter()

const title = ref('')
const author = ref('')

async function addBook() {
    const response = await apiCreateBook({
        title: title.value,
        author: author.value
    })

    router.push(`/books/${response.data._id}`)
}
</script>

<template>
    <h1>Create Book</h1>
    <form @submit.prevent="addBook">
        <div class="mb-3">
            <label for="">Title</label>
            <input type="text" v-model="title" class="form-control">
        </div>

        <div class="mb-3">
            <label for="">Author</label>
            <input type="text" v-model="author" class="form-control">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-success me-2">Create</button>
            <RouterLink to="/books" class="btn btn-primary me-2">Cancel</RouterLink>
        </div>
    </form>
</template>