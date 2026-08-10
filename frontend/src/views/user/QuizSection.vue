<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    words: {
        type: Array,
        required: true
    }
})

const questions = ref([])
const currentIndex = ref(0)
const selectedAnswer = ref('')
const score = ref(0)
const quizFinished = ref(false)

const currentQuestion = computed(() => {
    return questions.value[currentIndex.value]
})

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5)
}

function createQuestions() {
    if (props.words.length < 4) {
        questions.value = []
        return
    }

    questions.value = shuffle(props.words).map(word => {
        const incorrectAnswers = shuffle(
            props.words.filter(
                item => item._id !== word._id
            )
        )
            .slice(0, 3)
            .map(item => item.meaning)

        return {
            word: word.word,
            correctAnswer: word.meaning,
            answers: shuffle([
                word.meaning,
                ...incorrectAnswers
            ])
        }
    })

    currentIndex.value = 0
    selectedAnswer.value = ''
    score.value = 0
    quizFinished.value = false
}

function selectAnswer(answer) {
    if (selectedAnswer.value) {
        return
    }

    selectedAnswer.value = answer

    if (answer === currentQuestion.value.correctAnswer) {
        score.value++
    }
}

function nextQuestion() {
    if (!selectedAnswer.value) {
        return
    }

    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++
        selectedAnswer.value = ''
    } else {
        quizFinished.value = true
    }
}

function restartQuiz() {
    createQuestions()
}

watch(
    () => props.words,
    () => {
        createQuestions()
    },
    {
        immediate: true
    }
)
</script>

<template>
    <div>
        <!-- Not enough words -->
        <div
            v-if="questions.length < 1"
            class="alert alert-warning"
        >
            At least 4 words are required to start the quiz.
        </div>

        <!-- Quiz -->
        <div
            v-else-if="!quizFinished"
            class="card"
        >
            <div class="card-body p-4">

                <div
                    class="d-flex justify-content-between align-items-center mb-4"
                >
                    <h2 class="mb-0">
                        Quiz
                    </h2>

                    <span class="text-muted">
                        Question
                        {{ currentIndex + 1 }}
                        /
                        {{ questions.length }}
                    </span>
                </div>

                <h3 class="mb-4">
                    What does
                    <strong>
                        "{{ currentQuestion.word }}"
                    </strong>
                    mean?
                </h3>

                <div class="d-grid gap-2">
                    <button
                        v-for="answer in currentQuestion.answers"
                        :key="answer"
                        type="button"
                        class="btn text-start"
                        :class="{
                            'btn-success':
                                selectedAnswer &&
                                answer === currentQuestion.correctAnswer,

                            'btn-danger':
                                selectedAnswer === answer &&
                                answer !== currentQuestion.correctAnswer,

                            'btn-outline-primary':
                                !selectedAnswer
                        }"
                        @click="selectAnswer(answer)"
                    >
                        {{ answer }}
                    </button>
                </div>

                <div class="mt-4">
                    <button
                        type="button"
                        class="btn btn-primary"
                        :disabled="!selectedAnswer"
                        @click="nextQuestion"
                    >
                        {{
                            currentIndex === questions.length - 1
                                ? 'Finish Quiz'
                                : 'Next Question'
                        }}
                    </button>
                </div>

            </div>
        </div>

        <!-- Result -->
        <div
            v-else
            class="card text-center"
        >
            <div class="card-body p-5">

                <h2 class="mb-4">
                    Quiz Complete
                </h2>

                <h3 class="mb-4">
                    Your Score
                </h3>

                <p class="display-5">
                    {{ score }} / {{ questions.length }}
                </p>

                <p class="text-muted">
                    {{
                        Math.round(
                            (score / questions.length) * 100
                        )
                    }}%
                </p>

                <button
                    type="button"
                    class="btn btn-primary"
                    @click="restartQuiz"
                >
                    Try Again
                </button>

            </div>
        </div>
    </div>
</template>