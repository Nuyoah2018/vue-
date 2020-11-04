import axios from "axios"
import {reqseckilList} from "../../uitls/request"
// 数据
const state = {
    list: []//分类的list初始值，空数组
}
// 修改数据
const mutations = {
    // 直接修改state的，arr就是一个接收数据的数组，直接赋值给state.list
     changeList(state,arr){
          state.list =arr;
     }       
}
// 方法,处理逻辑
const actions = {
    // context就是仓库本身，store
        reqSeckillListAction(context){
    //  一进来页面就要发起获取list的请求
    // 是否需要返回树形结构  是-true,  否：不传(根据后台文档接口)
    reqseckilList().then(res=>{
        if(res.data.code==200){
            state.list=res.data.list
            // 加一个判断方法
            let list = res.data.list?res.data.list:[]
            // 使用context.commit方法提交到mutations上去修改数据
            context.commit("changeList",res.data.list)//如果不确定可以先写个[1,2,3]
        }
    })
        }
}
// 导出数据
const getters = {
    // 定义了数组以后就先导出给组件
    list(state) {
        return state.list
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    // 命名空间，如果设置了命名空间，就可以通过模块名/变量名访问变量。访问action也可以通过  模块名/action名访问
    namespaced:true
}