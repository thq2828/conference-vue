import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/css/conference_list.css"
import Logo from "./components/conference-comp/Logo";
import Version from "./components/conference-comp/Version";
import Navigation2 from "./components/conference-comp/Navigation2";

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
/*axios组件*/
Vue.prototype.$ajax = axios;


/*element组件*/
Vue.use(Element);


// axios.defaults.headers='Access-Control-Allow-Origin';
// axios.defaults.headers='Access-Control-Allow-Method:POST,GET';

//引入公共变量
import constant from './constant/constant'
Vue.prototype.constant = constant;

Vue.config.productionTip = false;
Vue.component('Logo', Logo);
Vue.component('Version', Version);
Vue.component('Navigation2', Navigation2);

new Vue({
    router,
    render: h => h(App),
    conmponents: {Logo, Version, Navigation2},
}).$mount('#app');

