import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,mutations,getters} from "./mutations"
import cate from "./modules/cate"
import spec from "./modules/spec"
import goods from "./modules/goods"
import member from "./modules/member"
import banner from "./modules/banner"
import seckill from "./modules/seckill"
// 第一种方式导出状态层
const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters:getters,
    // 模块
    modules:{
        cate,
        spec,
        goods,
        member,
        banner,
        seckill
    }
})



// 创建仓库
// 第二种方式导出状态层
// export const store=new Vuex.Store({
//     // 数据
//     state:{

//     },
//     // 专门修改state数据
//     mutations:{

//     }
// })
export default store