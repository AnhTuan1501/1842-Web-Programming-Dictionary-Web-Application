<script setup>
</script>

<template>
    <div class="container">
        <h1 class="mb-4">User Hub</h1>

        <div class="row g-3">
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Favourites</h5>
                        <p class="card-text">
                            View your favourite vocabulary.
                        </p>
                        <RouterLink
                            to="/words?view=favourite"
                            class="btn btn-primary"
                        >
                            View Favourites
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Recently Viewed</h5>
                        <p class="card-text">
                            View vocabulary you recently explored.
                        </p>
                        <RouterLink
                            to="/words?view=recent"
                            class="btn btn-primary"
                        >
                            View Recent
                        </RouterLink>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Learning</h5>
                        <p class="card-text">
                            Continue learning vocabulary.
                        </p>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            disabled
                        >
                            Coming Soon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>