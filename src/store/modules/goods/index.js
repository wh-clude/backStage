//引入接口文件
import {getGoodsCount, getGoodsList} from '../../../util/axios/index'
// 创建state模块
const state = {
    goodsList:[],
    count:0,
    page:1,
    size:2
}
// 创建getters模块
const getters = {
    getGoodsList(state){
        return state.goodsList;
    },
    getGoodsSize(state){
        return state.size
    },
    getGoodsCount(state){
        return state.count;
    }
}
// 创建mutations模块
const mutations = {
    REQ_GOODS(state,payload){
        state.goodsList = payload
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
    getGoodsAction(payload){
        getGoodsList({
            size:payload.state.size,
            page:payload.state.page
        })
        .then(res=>{
            // console.log(res,'列表');
            // console.log(payload,'payload');
            let {commit} =payload;
            if(res.data.code==200){
                let list =res.data.list?res.data.list:[]
                commit('REQ_GOODS',res.data.list);
                if(list.length==0&&payload.state.page!=1){
                    payload.dispatch('changePageAction',payload.state.page-1);
                    return
                }
            }
        });
    },
    getCountAction({commit}){
        getGoodsCount().then(res=>{
            // console.log(res.data.list);
            if(res.data.code==200){
                commit("REQ_COUNT",res.data.list[0].total)
            }
        })
    },
    //封装page的行动
    changePageAction(context,payload){
        context.commit('REQ_PAGE',payload);
        context.dispatch('getGoodsAction');
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
