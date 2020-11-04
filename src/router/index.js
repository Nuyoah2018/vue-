import Vue from 'vue'
import Router from 'vue-router'
import store from "../store/index"//把仓库引进来，因为下面要用仓库判断用户是登录过
Vue.use(Router)

// 把不确定的值换成参数
function checkedRoute(path,next){
      //  如果该用户menus_url中有"/menu"就next(),如果没有就next("/")
      let userInfo = store.state.userInfo;
      if(userInfo.menus_url.includes(path)){
        next()
      }else{
        next("/")
      }
}

// 写成一个变量  add页面要用，导出
export const indexRoutes=[
  {
    path:'menu',
    component:()=>import("../pages/menu/menu"),
    name:"菜单管理",
    beforeEnter(to, from, next){
      checkedRoute("/menu",next)
    }  
  },
  {
    path:'role',
    component:()=>import("../pages/role/role"),
    name:"角色管理",
    beforeEnter(to, from, next){
      checkedRoute("/role",next)
    }  
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage"),
    name:"管理员管理",
    beforeEnter(to, from, next){
      checkedRoute("/manage",next)
    }  
  },
  {
    path:"cate",
    component:()=>import("../pages/cate/cate"),
    name:"商品分类",
    beforeEnter(to, from, next){
      checkedRoute("/cate",next)
    }  
  },
  {
    path:"spec",
    component:()=>import("../pages/spec/spec"),
    name:"商品规格",
    beforeEnter(to, from, next){
      checkedRoute("/spec",next)
    }  
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods"),
    name:"商品管理",
    beforeEnter(to, from, next){
      checkedRoute("/goods",next)
    }  
  },
  {
    path:"banner",
    component:()=>import("../pages/banner/banner"),
    name:"轮播图管理",
    beforeEnter(to, from, next){
      checkedRoute("/banner",next)
    }  
  },
  {
    path:"member",
    component:()=>import("../pages/member/member"),
    name:"会员管理",
    beforeEnter(to, from, next){
      checkedRoute("/member",next)
    }  
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill"),
    name:"秒杀活动",
    beforeEnter(to, from, next){
      checkedRoute("/seckill",next)
    }  
  },
]
// 开始全局守卫
// 因为main.js需要路由，所以给路由对象取个名字导出
let router=new Router({
  routes:[
    {
      path:"/login",
      component:()=>import("../pages/login/login")
    },
    {
      path:"/",//一级路由重定向
      component:()=>import("../pages/index/index"),
      children:[
        {
          path:'',//二级路由重定向
          component:()=>import("../pages/home/home")
        }
      ].concat(indexRoutes)//数组拼接
    }
  ]
})
// 登录拦截
router.beforeEach((to,from,next)=>{
  // 1,如果用户前往的是/login，就直接next()
  if(to.path==="/login"){
    next()
    return;
  }
  // 2,如果前往的不是/login，就判断是否登录过。从vuex或者sessionStorage中取出值.取出来userInfo判断一下
  let userInfo=store.state.userInfo;
  if(userInfo.username){
    next()
    return;
  }
  // 如果登录过就next()
  next("/login")
  //如果没登录过，就next("/login")
})


// 导出
export default router