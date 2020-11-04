import Vuex from "vuex"

import {reqSpecList,reqSpecCount} from "../../uitls/request"
// 数据
let state={
     list:[],
    //  下面是分页数据
    //  总数
    total:0,
    // 一页的个数
    size:2,
    // 页码
    page:2,
    
}


// 修改state
let mutations={
    // 修改列表数据
   changeList(state,arr){
    state.list=arr
   },
   // 修改总数
   changeTotal(state,num){
       state.total=num
   },
    // 修改page
    changePage(state,page){
        state.page=page
    } 
}


// 处理方法。逻辑
let actions={
    // 发起获取list的请求，加上参数
    // 传一个bool
    reqListAction(context,bool){
        // 因为接口要求有分页，所以先传上一个固定的{page:1,size:10}
        // 商品规格需要有分页，商品管理不需要分页所以要处理一下
        // 如果接收到值就是空json,如果是undefined就是后面的值
        let p = bool?{}:{page:context.state.page,size:context.state.size}
        reqSpecList(p).then(res=>{
            if(res.data.code==200){
                let list = res.data.list?res.data.list:[];
                    // 如果取到了空数组并且当前页不是第一页，那么重新请求前一页
                    if(list.length==0&&context.state.page>1){
                        // 调用mutations修改
                        context.commit("changePage",context.state.page-1)
                        context.dispatch("reqListAction")
                        return

                    }


                // 转一下数组的数据
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                })
                // 请求完数据拿到action的方法去修改
                context.commit("changeList",list)
            }
        })
    },
    // 获取总数
    reqTotalAction(context){
        reqSpecCount().then(res=>{
            if(res.data.code==200){
                // 修改总数
                context.commit("changeTotal",res.data.list[0].total)
            }
        })
    },
    // 修改页码
    changePageAction(context,page){
        context.commit("changePage",page)
        //重新请求列表数据list.通过context.dispatch调取actions内方法
        context.dispatch("reqListAction")
    },
     
}

// 导出数据
let getters={
    // 先导出一下数据
        list(state){
            return state.list
        },
        total(state){
            return state.total
        },
        size(state){
            return state.size
        },
}
export default{
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced:true
}

