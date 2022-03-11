import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Mime from 'mime-types'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import FileReader from 'vue-filereader'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component(FileReader.name, FileReader)
Vue.use(Mime)

new Vue({
  el: '#app',
  render: h => h(App)
})
