import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'
import '@/styles/element-variables.scss'

import '@/styles/index.scss' // global css
import '@/assets/font_2404489_n027l8xs5fl/iconfont.css'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, {
  locale,
  size: 'small' || 'medium' // set element-ui default size
})
Vue.use(VCharts)

import Pagination from "@/components/Pagination";
import RightToolbar from '@/components/RightToolbar';
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  selectDictLabels,
  filterSize,
  download,
  handleTree,
  isObjEmpty
} from "@/utils/imep";

Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.isObjEmpty = isObjEmpty
Vue.prototype.filterSize = filterSize
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}
 
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
