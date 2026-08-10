<template>
    <div class="page-container">

        <!-- Hero -->
        <section class="text-center py-5">
            <div class="mx-auto" style="max-width: 760px;">
                <span class="badge bg-primary mb-3">
                    Multilingual Dictionary
                </span>

                <h1 class="display-4 fw-bold mb-3">
                    Learn words.
                    <span class="text-primary">
                        Build vocabulary.
                    </span>
                </h1>

                <p class="lead text-muted mb-4">
                    Search, explore and learn vocabulary with
                    an easy-to-use multilingual dictionary.
                </p>

                <div class="d-flex justify-content-center gap-2 flex-wrap">
                    <RouterLink
                        to="/words"
                        class="btn btn-primary btn-lg px-4"
                    >
                        Explore Dictionary
                    </RouterLink>

                    <RouterLink
                        to="/user-hub"
                        class="btn btn-outline-primary btn-lg px-4"
                    >
                        My Learning
                    </RouterLink>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="section-spacing">
            <div class="text-center mb-4">
                <h2>
                    Everything you need to learn
                </h2>

                <p class="text-muted">
                    Simple tools for exploring and improving your vocabulary.
                </p>
            </div>

            <div class="row g-4">

                <!-- Dictionary -->
                <div class="col-md-4">
                    <div class="card feature-card">
                        <div class="card-body">
                            <div class="feature-icon">
                                📖
                            </div>

                            <h5 class="card-title">
                                Dictionary
                            </h5>

                            <p class="text-muted">
                                Search vocabulary across multiple
                                languages and explore detailed word
                                information.
                            </p>

                            <RouterLink
                                to="/words?language=English"
                                class="btn btn-outline-primary"
                            >
                                Browse Words
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- Learning -->
                <div class="col-md-4">
                    <div class="card feature-card">
                        <div class="card-body">
                            <div class="feature-icon">
                                🧠
                            </div>

                            <h5 class="card-title">
                                Learning
                            </h5>

                            <p class="text-muted">
                                Review vocabulary with flashcards
                                and test your knowledge with quizzes.
                            </p>

                            <RouterLink
                                to="/user-hub"
                                class="btn btn-outline-primary"
                            >
                                Start Learning
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <!-- Personal Vocabulary -->
                <div class="col-md-4">
                    <div class="card feature-card">
                        <div class="card-body">
                            <div class="feature-icon">
                                ⭐
                            </div>

                            <h5 class="card-title">
                                My Vocabulary
                            </h5>

                            <p class="text-muted">
                                Keep track of favourite and recently
                                viewed words in one place.
                            </p>

                            <RouterLink
                                to="/user-hub"
                                class="btn btn-outline-primary"
                            >
                                View My Words
                            </RouterLink>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Simple Highlight -->
        <section class="soft-surface p-4 p-md-5 mb-4">
            <div class="row align-items-center">

                <div class="col-md-8">
                    <h3 class="mb-2">
                        Build your vocabulary step by step.
                    </h3>

                    <p class="text-muted mb-md-0">
                        Explore new words, save useful vocabulary,
                        and practise whenever you are ready.
                    </p>
                </div>

                <div class="col-md-4 text-md-end mt-3 mt-md-0">
                    <RouterLink
                        to="/words"
                        class="btn btn-primary"
                    >
                        Start Exploring
                    </RouterLink>
                </div>

            </div>
        </section>

    </div>
</template>