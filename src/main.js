// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入封装好的仓库
import store from './store/index'
//全局引入UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//创建一个图片地址
Vue.prototype.$imgUrl = 'http://localhost:3000'

//全局引入css样式
import './components/css/reset.css'
//引入封装的全局组件
import gCom from './common/index.js'
for(let i in gCom){
  Vue.component(i,gCom[i]);
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
