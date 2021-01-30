//引入接口文件
import {getMemberList} from '../../../util/axios/index'
// 创建state模块
const state = {
    memberList:[]
}
// 创建getters模块
const getters = {
    getMemberList(state){
        return state.memberList;
    }
}
// 创建mutations模块
const mutations = {
    REQ_MEMBER(state,payload){
        state.memberList=payload
    }
}
// 创建actions模块
const actions = {
    getMemberListAction({commit}){
        getMemberList()
        .then(res=>{
            // console.log(res,'hahaha');
            if(res.data.code==200){
                commit('REQ_MEMBER',res.data.list)
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
