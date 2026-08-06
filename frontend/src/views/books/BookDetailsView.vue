<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
import { apiGetBook } from '../../services/bookApi';

const route = useRoute()
const book = ref(null)

async function loadBook() {
    const response = await apiGetBook(route.params.id)
    book.value = response.data
}

onMounted(loadBook)
</script>

<template>
    <h1>Book Details</h1>

    <div v-if="book">
        <div>ID: {{ book._id }}</div>
        <div>Title: {{ book.title }}</div>
        <div>Author: {{ book.author }}</div>
    </div>

    <div v-else>Book Not Found !!!</div>

    <div>
        <RouterLink to="/books">Back</RouterLink>
    </div>
</template>