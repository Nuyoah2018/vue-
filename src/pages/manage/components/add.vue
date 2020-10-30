<template>
  <!--弹窗模板 -->
  <el-dialog :title="info.title" :visible.sync="info.isshow">
    <el-form :model="form">
      <el-form-item label="所属角色" label-width="120px">
        <el-select v-model="form.roleid" placeholder="请选择">
          <!-- :value="item.id":判断是哪一个编号id -->
          <el-option
            :label="item.rolename"
            :value="item.id"
            v-for="item in manageList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" label-width="120px">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input v-model="form.password" autocomplete="off" password></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="end">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.title=='添加角色'">添 加</el-button>
      <el-button type="primary" @click="bianji" v-else>编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reqRoleList, reqManageAdd,reqManageDate,reqManageOne } from "../../../uitls/request";
import { successAlert,errorAlert } from "../../../uitls/alert";
export default {
  props: ["info", "list"],
  components: {},
  data() {
    return {
    
      form: {
        uid:"",
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      manageList: [],
    };
  },
  methods: {
    end() {
      this.info.isshow = false;
    },
    // 管理员添加
    add() {
      reqManageAdd(this.form).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          // 调用父组件  重新渲染
          this.$emit("init");
          // 关闭弹窗
          this.end();
          // 弹出成功
          successAlert("成功添加")
        }else{
            errorAlert("添加失败")
        }
      });
    },
    // 获取一条数据
    getOne(uid){
      reqManageOne(uid).then(res=>{
        if(res.data.code==200){
          this.form=res.data.list
        }
      })
    },
    // 编辑/修改
    bianji(){
      reqManageDate(this.form).then(res=>{
        // console.log(res);
         if (res.data.code == 200) {
          // 调用父组件  重新渲染
          this.$emit("init");
          // 关闭弹窗
          this.end();
          // 弹出成功
          successAlert("编辑成功")
        }else{
            errorAlert("编辑失败")
        }
      })
    }
  },
  mounted() {
    // 打开先刷新菜单列表
    reqRoleList().then((res) => {
      this.manageList = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>