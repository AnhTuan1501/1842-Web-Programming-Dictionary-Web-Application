<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    words: {
        type: Array,
        required: true
    }
})

const currentIndex = ref(0)
const showAnswer = ref(false)

const currentWord = computed(() => {
    return props.words[currentIndex.value]
})

function showNext() {
    if (currentIndex.value < props.words.length - 1) {
        currentIndex.value++
        showAnswer.value = false
    }
}

function showPrevious() {
    if (currentIndex.value > 0) {
        currentIndex.value--
        showAnswer.value = false
    }
}

function toggleAnswer() {
    showAnswer.value = !showAnswer.value
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>
                Flashcards
            </h2>

            <span class="text-muted">
                {{ currentIndex + 1 }} / {{ words.length }}
            </span>
        </div>

        <div
            v-if="currentWord"
            class="card text-center"
        >
            <div class="card-body p-5">
                <h1 class="mb-4">
                    {{ currentWord.word }}
                </h1>

                <div
                    v-if="showAnswer"
                    class="mt-4"
                >
                    <hr>

                    <h4>
                        Meaning
                    </h4>

                    <p>
                        {{ currentWord.meaning }}
                    </p>

                    <h5>
                        Example
                    </h5>

                    <p class="text-muted">
                        {{ currentWord.example || 'No example available.' }}
                    </p>

                    <div
                        v-if="currentWord.synonyms?.length"
                        class="mt-3"
                    >
                        <strong>
                            Synonyms:
                        </strong>

                        {{ currentWord.synonyms.join(', ') }}
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-primary mt-4"
                    @click="toggleAnswer"
                >
                    {{ showAnswer ? 'Hide Answer' : 'Show Answer' }}
                </button>
            </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
            <button
                type="button"
                class="btn btn-secondary"
                :disabled="currentIndex === 0"
                @click="showPrevious"
            >
                Previous
            </button>

            <button
                type="button"
                class="btn btn-primary"
                :disabled="currentIndex === words.length - 1"
                @click="showNext"
            >
                Next
            </button>
        </div>
    </div>
</template>