import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/conference_list.css"
import Logo from "./components/conference-comp/Logo";
import Version from "./components/conference-comp/Version";
import Navigation1 from "./components/conference-comp/Navigation1";
import Navigation2 from "./components/conference-comp/Navigation2";

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/*element组件*/
Vue.use(Element)

Vue.config.productionTip = false;
Vue.component('Logo', Logo);
Vue.component('Version', Version);
Vue.component('Navigation1', Navigation1);
Vue.component('Navigation2', Navigation2);


new Vue({
    router,
    render: h => h(App),
    conmponents: {Logo, Version, Navigation1, Navigation2},
}).$mount('#app');
