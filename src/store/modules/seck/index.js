//引入接口文件
import {getSeckList} from '../../../util/axios/index'
// 创建state模块
const state = {
    seckList:[]
}
// 创建getters模块
const getters = {
    getSeckList(state){
        return state.seckList;
    }
}
// 创建mutations模块
const mutations = {
    REQ_SECK(state,payload){
        state.seckList=payload
    }
}
// 创建actions模块
const actions = {
    getSeckListAction({commit}){
        getSeckList()
        .then(res=>{
            // console.log(res,'klklkl');
            if(res.data.code==200){
                commit('REQ_SECK',res.data.list)
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
