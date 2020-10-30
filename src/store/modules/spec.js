import Vuex from "vuex"

import {reqSpecList} from "../../uitls/request"
// 数据
let state={
     list:[]
}


// 修改state
let mutations={
   changeList(state,arr){
    state.list=arr
   }
}


// 处理方法。逻辑
let actions={
    // 发起获取list的请求，加上参数
    reqListAction(context){
        // 因为接口要求有分页，所以先传上一个固定的{page:1,size:10}
        reqSpecList({page:1,size:10}).then(res=>{
            if(res.data.code==200){
                let list = res.data.list?res.data.list:[];
                // 转一下数组的数据
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                })
                // 请求完数据拿到action的方法去修改
                context.commit("changeList",list)
            }
        })
    }
}

// 导出数据
let getters={
    // 先导出一下数据
        list(state){
            return state.list
        }
}
export default{
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced:true
}

