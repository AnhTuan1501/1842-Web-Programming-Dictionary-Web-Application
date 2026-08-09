<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
import { apiGetWord } from '../../services/wordApi';

const route = useRoute()
const word = ref(null)

async function loadWord() {
    const response = await apiGetWord(route.params.id)
    word.value = response.data
}

onMounted(loadWord)
</script>

<template>
    <h1>Word Details</h1>
    <div v-if="word">
        <div>ID: {{ word._id }}</div>
        <div>Word: {{ word.word }}</div>
        <div>Meaning: {{ word.meaning }}</div>
    </div>

    <div v-else>Word Not Found !!!</div>

    <div>
        <RouterLink to="/words">Back</RouterLink>
    </div>
</template>