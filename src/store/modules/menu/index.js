//引入接口文件
import {getMenuList} from '../../../util/axios/index'
// 创建state模块
const state = {
    meunList:[]
}
// 创建getters模块
const getters = {
    getMenuList(state){
        return state.meunList;
    }
}
// 创建mutations模块
const mutations = {
    REQ_MENULIST(state,payload){
        state.meunList = payload;
    }
}
// 创建actions模块
const actions = {
    getMenuListAction({commit}){
        getMenuList()
        .then(res=>{
            // console.log(res,'liebiao');
            if(res.data.code==200){
                commit('REQ_MENULIST',res.data.list)
            }
        })
    }
}
// 导出创建好的属性
export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}
