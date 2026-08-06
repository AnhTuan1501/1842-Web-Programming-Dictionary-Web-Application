<script setup>
import { ref, onMounted } from 'vue'
import { apiGetBooks, apiDeleteBook } from '../../services/bookApi'
import { isAdmin } from '../../services/auth'

const books = ref([])

async function loadBooks() {
    const response = await apiGetBooks()
    books.value = response.data
}

async function removeBook(id) {
    const confirmed = confirm('Are you sure to delete this book?')

    if (!confirmed)
        return

    await apiDeleteBook(id)

    books.value = books.value.filter(
        book => book._id !== id
    )
}

onMounted(loadBooks)
</script>

<template>
    <div>
        <h1>Book List</h1>

        <RouterLink v-if="isAdmin" to="/books/create" class="btn btn-success mb-3">
            Create
        </RouterLink>

        <table class="table table-hover">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>

            <tr v-for="book in books" :key="book._id">
                <td>{{ book._id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>
                    <RouterLink :to="{
                        name: 'book-details',
                        params: { id: book._id }
                    }" class="btn btn-primary btn-sm me-2">
                        Details
                    </RouterLink>
                    <RouterLink v-if="isAdmin" :to="`/books/${book._id}/edit`" class="btn btn-warning btn-sm me-2">
                        Edit
                    </RouterLink>
                    <button v-if="isAdmin" @click="removeBook(book._id)" class="btn btn-danger btn-sm me-2">
                        Delete
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>