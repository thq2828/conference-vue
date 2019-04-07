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
            children:
                [
                    {
                        path: '/first',
                        name: 'first',
                        component: () => import('./components/conference-comp/First.vue')
                    },
                    {
                        path: '/conferenceList',
                        name: 'conferenceList',
                        component: () => import('./components/conference-comp/ConferenceList.vue')
                    },
                    {
                        path: '/addConference',
                        name: 'addConference',
                        component: () => import('./components/conference-comp/AddConference.vue')
                    },
                    {
                        path: '/editorConference',
                        name: 'editorConference',
                        component: () => import('./components/conference-comp/EditorConference.vue')
                    },
                    {
                        path: '/personnelList',
                        name: 'personnelList',
                        component: () => import('./components/conference-comp/PersonnelList.vue')
                    },
                    {
                        path: '/addPersonnel',
                        name: 'addPersonnel',
                        component: () => import('./components/conference-comp/AddPersonnel.vue')
                    },
                    {
                        path: '/editorPersonnel',
                        name: 'editorPersonnel',
                        component: () => import('./components/conference-comp/EditorPersonnel.vue')
                    },
                    {
                        path: '/meettingList',
                        name: 'meettingList',
                        component: () => import('./components/conference-comp/MeettingList.vue')
                    },
                    {
                        path: '/addMeetting',
                        name: 'addMeetting',
                        component: () => import('./components/conference-comp/AddMeetting.vue')
                    },
                    {
                        path: '/editorMeetting',
                        name: 'editorMeetting',
                        component: () => import('./components/conference-comp/EditorMetting.vue')
                    }
                ]
        }
    ]
})
