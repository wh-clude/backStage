import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入menu模块
import menu from './modules/menu/index'
//引入role模块
import role from './modules/role/index'
//引入manager模块
import manager from './modules/manager/index'
//引入classify模块
import classify from './modules/classify/index'
//导入specs商品规格模块
import specs from './modules/specs/index'
//导入goods商品管理模块
import goods from './modules/goods/index'
//导入banner轮播图列表
import banner from './modules/banner/index'
//导入seck限时秒杀模块
import seck from './modules/seck/index'
//导入会员模块
import member from './modules/vip/index'
export default new Vuex.Store({
    state: {
        loginInfo: sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')) : []
    },
    getters: {
        getUserInfo(state) {
            return state.loginInfo
        }
    },
    mutations: {
        CHANGE_USER(state, payload) {
            state.loginInfo = payload
            if (payload) {
                sessionStorage.setItem('loginInfo', JSON.stringify(payload))
            } else {
                sessionStorage.removeItem('loginInfo')
            }
        }
    },
    actions: {
        changeUserInfoAction(context, payload) {
            context.commit('CHANGE_USER', payload)
        }
    },
    modules: {
        menu,
        role,
        manager,
        classify,
        specs,
        goods,
        banner,
        seck,
        member
    }
})