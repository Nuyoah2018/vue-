// vuex里actions处理逻辑的一部分在这里写
export const actions={
    //组件触发修改userInfo
    changeUserInfoAction(context,info){
        context.commit("changeUserInfo",info)
    }
}