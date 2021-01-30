//引入接口文件
import {getClassifyList} from '../../../util/axios/index'
// 创建state模块
const state = {
    classifyList:[]
}
// 创建getters模块
const getters = {
    getClassifyList(state){
        return state.classifyList;
    }
}
// 创建mutations模块
const mutations = {
    REQ_CLASSIFY(state,payload){
        state.classifyList = payload;
    }
}
// 创建actions模块
const actions = {
    getClassifyListAction({commit}){
        getClassifyList()
        .then(res=>{
            // console.log(res,'分类liebiao');
            if(res.data.code==200){
                commit('REQ_CLASSIFY',res.data.list)
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
