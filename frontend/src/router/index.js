// npm install vue-router
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/home/HomeView.vue'
import AboutView from '../views/home/AboutView.vue'
import NotFoundView from '../views/home/NotFoundView.vue'
import LoginView from '../views/home/LoginView.vue'
import RegisterView from '../views/home/RegisterView.vue'

import WordsView from '../views/words/WordsView.vue'
import WordDetailsView from '../views/words/WordDetailsView.vue'
import CreateWordView from '../views/words/CreateWordView.vue'
import EditWordView from '../views/words/EditWordView.vue'


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
        path: '/words',
        name: 'words',
        component: WordsView
    },
    {
        path: '/words/create',
        name: 'create-word',
        component: CreateWordView,
        meta: {
            requiresAuth: true,
            roles: ['admin']
        }
    },
    {
        path: '/words/:id',
        name: 'word-details',
        component: WordDetailsView
    },
    {
        path: '/words/:id/edit',
        name: 'edit-word',
        component: EditWordView,
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
            name: 'words'
        }
    }

    if (to.meta.guestOnly && user) {
        return {
            name: 'words'
        }
    }
})

export default router