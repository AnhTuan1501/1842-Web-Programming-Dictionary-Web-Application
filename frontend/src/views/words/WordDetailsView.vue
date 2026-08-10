<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'
import { apiGetWord } from '../../services/wordApi';
import {apiGetFavourites, apiAddFavourite, apiRemoveFavourite, apiAddRecent, apiGetRecents } from '../../services/userApi'
import { isLoggedIn } from '../../services/auth'

const route = useRoute()
const router = useRouter()  
const word = ref(null)
const isFavourite = ref(false)

async function loadWord() {
    const response = await apiGetWord(route.params.id)

    word.value = response.data

    if (isLoggedIn.value) {
        await apiAddRecent(word.value._id)

        const favourites = await apiGetFavourites()

        isFavourite.value = favourites.data.some(
            item => item._id === word.value._id
        )
    }
}

async function toggleFavourite() {
    if (isFavourite.value) {
        await apiRemoveFavourite(word.value._id)
        isFavourite.value = false
    } else {
        await apiAddFavourite(word.value._id)
        isFavourite.value = true
    }
}

function goBackToDictionary() {
    router.push({
        path: '/words',
        query: {
            language: route.query.language || 'English'
        }
    })
}

onMounted(loadWord)
</script>

<template>
    <h1>Word Details</h1>
    <div v-if="word">
        <button
            class="btn btn-outline-warning"
            @click="toggleFavourite"
        >
            {{ isFavourite ? '♥ Favourite' : '♡ Add to Favourite' }}
        </button>

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

   <button type="button" class="btn btn-primary" @click="goBackToDictionary"> Back </button>
</template>