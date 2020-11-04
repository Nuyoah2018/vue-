import {reqMemberList} from "../../uitls/request"

const state={
      list:[]
}
const mutations={
     //修改list
    changeList(state, arr) {
        state.list = arr;
    },
}
const actions={
    reqListAction(context){
        reqMemberList().then(res=>{
           if(res.data.code==200){          
            //    console.log(res);
            context.commit("changeList", res.data.list)
           }
        })
    }
}
const getters={
    list(state) {
        return state.list
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
