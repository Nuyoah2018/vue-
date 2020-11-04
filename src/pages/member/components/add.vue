<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from '../../../uitls/alert';
import { reqMemberDetail, reqMemberDate } from "../../../uitls/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
          uid:"",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
      ...mapGetters({
        List:"member/list"
      })
  },
  methods: {
    ...mapActions({
       getListAction:"member/reqListAction"
    }),
    //   点击修改
    updata() {
        // console.log(this.form);
      reqMemberDate(this.form).then((res) => {
        if (res.data.code == 200) {
              this.getListAction()
              this.info.isshow=false
              successAlert("修改成功")
        // console.log(res);
        
        }else{
          errorAlert("res.data.msg")
        }
      });
    },
    //   获取一条数据
    getOne(uid) {
      reqMemberDetail(uid).then((res) => {
             
        this.form = res.data.list;
      });
    },
  },
  mounted() {
   this.getListAction()
  },
};
</script>
<style scoped>
</style>