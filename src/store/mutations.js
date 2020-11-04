// vuex和本地同步存储
// 跟级别下的state
export const state={
    // 存储用户信息，初始值是json数据
    // 判断有没有登录过,如果登陆过，就把信息取出来转换成字符串。如果没登录过就是初始值空对象
    // sessionStorage.getItem：读取数据语法。取不到值是null
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const mutations={
    // 修改 userInfo.把state里的userInfo改成info的数据
    changeUserInfo(state,info){
        // vuex存储
        state.userInfo=info
        // 同步到本地一份存储
        // 如果有数据就保存下来，如果没数据就说明是已经退出，就把数据清空
        if(info.username){
            // sessionStorage.setItem:保存数据
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            //  使用removeItem移除指定的数据
            sessionStorage.removeItem("userInfo")
        }
        
    }
}
export const getters={
    // 导出
        userInfo(state){
            return state.userInfo;
        }
}