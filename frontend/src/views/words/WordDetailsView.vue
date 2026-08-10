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
        <div> 
            <strong>ID: </strong> {{ word._id }} 
        </div>
        <div>     
            <strong>Word: </strong>{{ word.word }}
        </div>
        <div>     
            <strong>Meaning: </strong>{{ word.meaning }}</div>
        <div>     
            <strong>Example: </strong>{{ word.example }}</div>
       <div>
        <strong>Synonyms: </strong>
        <span v-for="(synonym, index) in word.synonyms" :key="synonym">
        {{ synonym }}<span v-if="index < word.synonyms.length - 1">, </span>
        </span>
        </div>
        <div>  
            <strong>Language: </strong>{{ word.language }}
        </div>
    </div>

    <div v-else>Word Not Found !!!</div>

    <div>
        <RouterLink to="/words">Back</RouterLink>
    </div>
</template>