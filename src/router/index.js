import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapDemo from '../views/MapDemo'
import mapHtDemo from '../views/mapHtDemo'
import MapThree from "@/views/MapThree";

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import(/* webpackChunkName: "about" */ '../views/ListMenu.vue')
            },
            {
                path: 'map/demo',
                name: 'MapDemo',
                component: MapDemo
            },
        ]
    },
    {
        path: '/mapHtDemo',
        name: 'mapHtDemo',
        component: mapHtDemo
    },
    {
        path: '/mapThree',
        name: 'MapThree',
        component: MapThree
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
