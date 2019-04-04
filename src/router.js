import Vue from 'vue'
import Router from 'vue-router'
import Home1 from './views/Home.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/', redirect: '/first',
            name: 'home',
            component: Home1,
            children: [{
                path: '/first',
                name: 'first',
                component: () => import('./components/conference-comp/First.vue')
            },
                {
                    path: '/conferenceList',
                    name: 'conferenceList',
                    component: () => import('./components/conference-comp/ConferenceList.vue')
                }]
        }
    ]
})
