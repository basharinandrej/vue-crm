import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuelidate from 'vuelidate'
import router from './router'
import {dateFilter} from './filters/date.filter.js'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)



firebase.initializeApp({
  apiKey: "AIzaSyCGqDPOXSgCl3LjXz9Rwf5VAC0iRWa9p7M",
  authDomain: "crm-vue-b1cd1.firebaseapp.com",
  projectId: "crm-vue-b1cd1",
  storageBucket: "crm-vue-b1cd1.appspot.com",
  messagingSenderId: "317320038751",
  appId: "1:317320038751:web:357a4fcae47f3e4617ceea"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
