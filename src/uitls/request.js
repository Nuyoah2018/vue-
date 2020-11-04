// 封装

import axios from "axios"
import qs from "qs"
import {errorAlert} from "../uitls/alert"
import Vue from "vue"
import store from "../store"
import router from "../router"
// 开发环境中使用localhost:8080
// 开发环境使用：
let baseUrl ="/api"
Vue.prototype.$imgPre="http://localhost:3000"


// 打包环境使用：
// let baseUrl =""
// Vue.prototype.$imgPre=""

// axios.interceptors.response.use(res=>{

//     if(res.data.code!==200){
//         errorAlert(res.data.msg)
//     }
//     return res;
// })
// 前端每一个请求,除了登录之外，都需要携带一个headers.authorization ,值是用户登录成功的token
//请求拦截
axios.interceptors.request.use(req=>{
    //如果请求的地址不是登录，就配置请求头
    if(req.url!==baseUrl+"/api/userlogin"){
        req.headers.authorization=store.state.userInfo.token;
    }
    return req;
})
//响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求的地址是：" + res.config.url)
    console.log(res);
    //失败了，统一弹失败的弹框
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }

    //判断是否登录过期  msg="登录已过期或访问权限受限"
    if(res.data.msg==="登录已过期或访问权限受限"){
        router.push('/login')
        //用户信息置空
        store.dispatch("changeUserInfoAction",{})
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
// 商品分类的列表  传一个参数params后续要通过一级分类获取二级
export const reqCateList=(params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:params
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
// 商品规格列表  params={page:1,size:10}
export const reqSpecList=(params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:params
       
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
// 商品规格总数（用于计算分页）
export const reqSpecCount=()=>{
    return axios ({
        url:baseUrl+"/api/specscount",
        method:"get",
    })
}
//商品管理添加
export const reqGoodsAdd = (form) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: form
    })
}

//商品管理列表 params={page:1,size:10}
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品管理详情 1条
export const reqGoodsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//商品管理修改
export const reqGoodsUpdate = (data) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}

//商品管理删除
export const reqGoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

//商品管理总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}
// 商品会员列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}
// 商品会员获取一条数据 p={uid:"1"} "1"
export const reqMemberDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid:uid
        }
    })
}


// 商品会员修改
export const reqMemberDate = (form) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(form)
    })
}

// 商品管理员登录
export const reqLogin = (form) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(form)
    })
}
// 轮播图列表
export const reqBanner = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
// 轮播图添加
export const reqBannerDate = (data) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}
// 轮播图删除
export const reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({
            id:id
        })
    })
}
// 轮播图修改
export const reqBannerDit= (data) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}
// 轮播图一条数据
export const reqBannerOne= (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id:id
        }
    })
}
// 限时秒杀列表
export const reqseckilList= () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}
// 限时秒杀添加
export const reqseckilDate= (form) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 限时秒杀获取一条数据
export const reqseckilOne= (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params:{
            id:id
        }
    })
}

// 限时秒杀编辑/修改
export const reqseckilDit= (form) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 限时秒杀删除
export const reqseckilDel= (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify({
            id:id
        })
    })
}
