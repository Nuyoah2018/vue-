import { reqBanner  } from "../../uitls/request"
let state = {
    //列表数据
    list: [],

}
let mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
}

let actions = {
    //发起获取list的请求
    reqBannerListAction(context) {
        //发请求
        reqBanner().then(res => {
            if (res.data.code === 200) {
                let list = res.data.list ? res.data.list : [];
                context.commit("changeList", list)
            }
        })
    },
}

let getters = {
    list(state) {
        return state.list
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}