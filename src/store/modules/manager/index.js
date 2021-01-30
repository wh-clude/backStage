//引入接口文件
import {getCount, getManagerList} from '../../../util/axios/index'
// 创建state模块
const state = {
    managerList:[],
    count:0,
    page:1,
    size:2
}
// 创建getters模块
const getters = {
    getManagerList(state){
        return state.managerList;
    },
    getManagerSize(state){
        return state.size
    },
    getCount(state){
        return state.count;
    }
}
// 创建mutations模块
const mutations = {
    REQ_MANAGER(state,payload){
        state.managerList = payload
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
    getManagerAction(payload){
        getManagerList({
            size:payload.state.size,
            page:payload.state.page
        })
        .then(res=>{
            // console.log(res,'manager列表');
            // console.log(payload,'payload');
            let {commit} =payload;
            if(res.data.code==200){
                let list =res.data.list?res.data.list:[]
                commit('REQ_MANAGER',res.data.list);
                if(list.length==0&&payload.state.page!=1){
                    payload.dispatch('changePageAction',payload.state.page-1);
                    return
                }
            }
        });
    },
    getCountAction({commit}){
        getCount().then(res=>{
            // console.log(res.data.list);
            if(res.data.code==200){
                commit("REQ_COUNT",res.data.list[0].total)
            }
        })
    },
    //封装page的行动
    changePageAction(context,payload){
        context.commit('REQ_PAGE',payload);
        context.dispatch('getManagerAction');
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
