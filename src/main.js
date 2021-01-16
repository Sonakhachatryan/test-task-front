import Vue from 'vue';
import App from '@/App.vue';
import firebase from 'firebase';
import config from "../env";
import router from "@/routes";
import store  from "@/store";

/*------ BOOTSTRAP ------*/
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/*------ VUELIDATE ------*/
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

/*------ VUE TOAST ------*/
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast,{position: 'top', duration: 5000});

/*------ VUE LOADING OVERLAY ------*/
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

Vue.config.productionTip = false
firebase.initializeApp(config.firebaseConfigs);


firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async user => {
      await store.dispatch("auth/fetchUser", user);
      resolve(user);
    }, reject);
  })
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
