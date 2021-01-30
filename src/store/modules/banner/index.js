//引入接口文件
import {getBannerList} from '../../../util/axios/index'
// 创建state模块
const state = {
    bannerList:[]
}
// 创建getters模块
const getters = {
    getBannerList(state){
        return state.bannerList;
    }
}
// 创建mutations模块
const mutations = {
    REQ_BANNER(state,payload){
        state.bannerList = payload;
    }
}
// 创建actions模块
const actions = {
    getBannerListAction({commit}){
        getBannerList()
        .then(res=>{
            // console.log(res,'分类liebiao');
            if(res.data.code==200){
                commit('REQ_BANNER',res.data.list)
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
