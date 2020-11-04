<template>
  <div class="login">
      <div class="con">
          <h3>登录</h3>
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
          <div class="btn-parent">
              <el-button type="primary" @click="login">登录</el-button>
          </div>
      </div>
  </div>
</template>

<script>
import { reqLogin } from '../../uitls/request'
import {mapActions,successAlert} from "vuex"
export default {
     components: {

  },
    data(){
        return{
            form:{
                username:"",
                password:""
            }
        }
    },
    methods:{
        ...mapActions(["changeUserInfoAction"]),
        login(){
            reqLogin(this.form).then(res=>{
                if(res.data.code==200){
                    //1.存用户信息 res.data.list
                     //本地存储存进去的内容都会变成string,所以在存之前需要JSON.stringify() ,取出来JSON.parse() 
                     //本地存储 优点：刷新以后数据还在 缺点：取值不好用
                    //vuex   优点：取值好取 缺点：刷新，数据就没了
                    this.changeUserInfoAction(res.data.list)
                    // 2,跳转页面
                     this.$router.push("/")
                }
            })
        }
    }
}
</script>

<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#553544,#423A52,#303C5F);
    position: relative;
}
.con{
    width: 400px;
    padding: 20px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 30px;
}
h3{
    text-align: center;
    line-height: 60px;
}
.el-input{
    margin-bottom: 20px;
}
.btn-parent{
    text-align: center;
}
</style>