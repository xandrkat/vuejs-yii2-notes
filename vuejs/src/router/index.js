import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import DefaultLayout from "../layuots/DefaultLayout";
import AuthLayout from "../layuots/AuthLayout";
import authService from "../sevices/auth.service";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // name: 'Default',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login,
            }, {
                path: 'register',
                name: 'register',
                component: Register
            },
        ]
    },
    {
        path: '/login',
        redirect: '/auth/login'
    },
    {
        path: '/register',
        redirect: '/auth/register'
    }

    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === 'home' && !authService.isLoggedIn()) {
        next('login');
    } else if (authService.isLoggedIn() && to.name !== 'home') {
        next('home');
    }
    next();
});
export default router
