//引入接口文件
import {getSpecsCount, getSpecsList} from '../../../util/axios/index'
// 创建state模块
const state = {
    specsList:[],
    count:0,
    page:1,
    size:2
}
// 创建getters模块
const getters = {
    getSpecsList(state){
        return state.specsList;
    },
    getSpecsSize(state){
        return state.size
    },
    getSpecsCount(state){
        return state.count;
    }
}
// 创建mutations模块
const mutations = {
    REQ_SPECS(state,payload){
        state.specsList = payload
    },
    REQ_COUNT(state,payload){
        state.count = payload
    },
    REQ_PAGE(state,payload){
        state.page = payload
    }
}
// 创建actions模块
const actions = {
    getSpecsAction(payload){
        getSpecsList({
            size:payload.state.size,
            page:payload.state.page
        })
        .then(res=>{
            // console.log(res,'列表');
            // console.log(payload,'payload');
            let {commit} =payload;
            if(res.data.code==200){
                let list =res.data.list?res.data.list:[]
                commit('REQ_SPECS',res.data.list);
                if(list.length==0&&payload.state.page!=1){
                    payload.dispatch('changePageAction',payload.state.page-1);
                    return
                }
            }
        });
    },
    getCountAction({commit}){
        getSpecsCount().then(res=>{
            // console.log(res.data.list);
            if(res.data.code==200){
                commit("REQ_COUNT",res.data.list[0].total)
            }
        })
    },
    //封装page的行动
    changePageAction(context,payload){
        context.commit('REQ_PAGE',payload);
        context.dispatch('getSpecsAction');
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
