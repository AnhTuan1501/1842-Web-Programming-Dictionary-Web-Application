// npm install vue-router
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/home/HomeView.vue'
import AboutView from '../views/home/AboutView.vue'
import NotFoundView from '../views/home/NotFoundView.vue'

import BooksView from '../views/books/BooksView.vue'
import BookDetailsView from '../views/books/BookDetailsView.vue'
import CreateBookView from '../views/books/CreateBookView.vue'
import EditBookView from '../views/books/EditBookView.vue'
import LoginView from '../views/home/LoginView.vue'
import RegisterView from '../views/home/RegisterView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/books',
        name: 'books',
        component: BooksView
    },
    {
        path: '/books/create',
        name: 'create-book',
        component: CreateBookView,
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    },
    {
        path: '/books/:id',
        name: 'book-details',
        component: BookDetailsView
    },
    {
        path: '/books/:id/edit',
        name: 'edit-book',
        component: EditBookView,
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            guestOnly: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: {
            guestOnly: true
        }
    },
    // Must be the last one.
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const userText = localStorage.getItem('user')

    const user = userText
        ? JSON.parse(userText)
        : null

    if (to.meta.requiresAuth && !user) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        }
    }

    if (
        to.meta.roles &&
        !to.meta.roles.includes(user?.role)
    ) {
        return {
            name: 'books'
        }
    }

    if (to.meta.guestOnly && user) {
        return {
            name: 'books'
        }
    }
})

export default router