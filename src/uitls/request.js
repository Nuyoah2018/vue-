// 封装

import axios from "axios"
import qs from "qs"
import {errorAlert} from "../uitls/alert"
import Vue from "vue"
// 开发环境中使用localhost:8080
// 开发环境使用：
let baseUrl ="/api"
Vue.prototype.$imgPre="http://localhost:3000"


// 打包环境使用：
// let baseUrl =""
// Vue.prototype.$imgPre=""

axios.interceptors.response.use(res=>{

    if(res.data.code!==200){
        errorAlert(res.data.msg)
    }
    return res;
})

// 菜单添加
export const reqMenuAdd=(form)=>{
    return axios ({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(form)
    })
}
// 菜单详情  一条
export const reqMenuDetail=(id)=>{
    return axios ({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
// 菜单更新/修改
export const reqMenuUpdate =(form)=>{
      return axios({
          url:baseUrl+"/api/menuedit",
          method:"post",
          data:qs.stringify(form)
      })
}
// 菜单删除
export const reqMenuDel= (id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}
// 菜单列表
export const reqMenuList=()=>{
    return axios ({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true  
        }
    })
}
// 角色添加
export const reqRoleAdd=(form)=>{
    return axios ({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(form)
    })
}
// 角色列表
export const reqRoleList=()=>{
    return axios ({
        url:baseUrl+"/api/rolelist",
        method:"get",
        
    })
}
// 角色获取（一条
export const reqRoleDetail=(id)=>{
    return axios ({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
// 角色修改
export const reqRoleUpdate=(form)=>{
    return axios ({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(form)
    })
}
// 角色删除
export const reqRoleDel=(id)=>{
    return axios ({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}
// 管理员添加
export const reqManageAdd=(form)=>{
    return axios ({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(form)
    })
}
// 管理员列表
export const reqManageList=(List)=>{
    return axios ({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:List
    })
}
// 管理员获取一条数据
export const reqManageOne=(uid)=>{
    return axios ({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}
// 管理员修改
export const reqManageDate=(form)=>{
    return axios ({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(form)
    })
}
// 管理员删除
export const reqManageDel=(uid)=>{
    return axios ({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:{
            uid:uid
        }
    })
}
//管理员总数
export const reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get",
    })
}
// 分类的添加
export const reqCateAdd=(data)=>{
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:data
    })
}
// 商品分类的列表
export const reqCateList=()=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:{
            istree:true
        }
    })
}
// 商品分类的删除
export const reqCateDel=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        // 没有涉及到文件就用qs.stringify转换一下
          data:qs.stringify({
              id:id
          })
   })
}
// 商品分类的编辑
export const reqCateDate=(data)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:data
   })
}
// 商品分类获取（一条）
export const reqCateDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
// 商品规格添加
export const reqSpecAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(form)
       
    })
}
// 商品规格添加  params={page:1,size:10}
export const reqSpecList=(params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:{
            params:params
        }
       
    })
}
// 商品规格删除
export const reqSpecDel=(id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
       
    })
}
// 商品规格获取一条商品信息
export const reqSpecDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
       
    })
}
// 商品规格编辑
export const reqSpecDate=(form)=>{
    return axios ({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(form)
    })
}