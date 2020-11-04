<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <div class="ipt-box">
              <el-input v-model="item.val" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" @click="addArr" v-if="index==0">新增规格属性</el-button>
            <!-- 数组里删除@click="delArr(index) -->
            <el-button type="danger" v-else @click="delArr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加规格'">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecAdd, reqSpecDetail,reqSpecDate } from "../../../uitls/request";
import { successAlert, errorAlert } from "../../../uitls/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      //  规格属性值
      attrArr: [{ val: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      //获取分类list
      reqList: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction",//添加完成请求总数
    }),
    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      }
       this.attrArr=[{ val: "" }]
    },
    cancel() {
      this.info.isshow = false;
    },
    //   点击新增规格属性
    addArr() {
      this.attrArr.push({ val: "" });
    },
    // 删除规格属性,使用下标删除数组中的某一个元素
    delArr(index) {
      this.attrArr.splice(index, 1);
    },
    // 点击添加
    add() {
      // console.log(this.attrArr);//拿到的数据是[{val:"1"},{val:"2"}]，需要转换成["1","2"]。使用map方法返回一个新数组,使用return返回出去。因为需要的是字符串形式的数组，所以再用JSON.stringfiy转换一下
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.val));
      // console.log(this.form);//获取到了字符串形式的数组，进行下一步
      // 点击添加发送请求
      reqSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //重置form
          this.empty();
            // 弹框消失
          this.cancel();
          // 弹出成功
          successAlert("添加成功");
          //刷新list
          this.reqList();
          // 请求总数
          this.reqTotalAction()
        }
      });
    },

    // 获取一条数据请求
    getOne(id) {
      reqSpecDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
            //this.form.attrs ["64G","128G"]--->[{val:"64G"},{val:"128G"}]

          this.attrArr=JSON.parse(this.form.attrs).map(item=>({val:item}))
          console.log(this.form);
        }
      });
    },
    //点击编辑
    updata(){
       this.form.attrs=JSON.stringify(this.attrArr.map(item=>item.val))
      reqSpecDate(this.form).then((res) => {
        if (res.data.code == 200) {
           // 关闭弹窗
          this.cancel();
            //  刷新
          this.reqList();
          // 重置form
          this.empty()
          successAlert("编辑成功");    
        }else{
                errorAlert(res.data.msg)
            }
      });
    }
  },
  mounted() {
    this.reqList()
  },
};
</script>
<style scoped>
.line {
  display: flex;
}
.ipt-box {
  flex: 1;
}
</style>