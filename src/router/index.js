import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import storage from '@/utils/storage'

const routes = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main/main.vue'),
        redirect: '/main/system/user',
        // children: [] 根据userMenu来决定children
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('@/components/not-found.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to) => {
    if (to.path !== '/login') {
        const token = storage.getStorage('token')
        if (!token) {
            return '/login'
        }
    }
    // console.log(router.getRoutes())
    // console.log(to, from)

    // 当点击登陆时，我是push到main页面的，所以这里要跳转到main下面的第一个页面，
    // 我觉得没有必要在这里拦截跳转，我采用的办法是：直接在router main中进行了 redirect
    // if (to.path === '/main') {
    //     return firstMenu.url
    // }
})

export default router
