//引入接口文件
import {getRoleList} from '../../../util/axios/index'
// 创建state模块
const state = {
    roleList:[]
}
// 创建getters模块
const getters = {
    getRoleList(state){
        return state.roleList;
    }
}
// 创建mutations模块
const mutations = {
    REQ_ROLE(state,payload){
        state.roleList=payload
    }
}
// 创建actions模块
const actions = {
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
            // console.log(res,'klklkl');
            if(res.data.code==200){
                commit('REQ_ROLE',res.data.list)
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
