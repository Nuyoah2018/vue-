<template>
  <!--弹窗模板 -->
  <el-dialog :title="info.title" :visible.sync="info.isshow">
    <el-form :model="form">
      <el-form-item label="活动名称" label-width="120px">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动期限" label-width="120px">
        <el-date-picker
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="timestamp"
          @change="change"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类" label-width="120px">
        <el-select v-model="form.first_cateid" @change="chengeFirst">
          <el-option label="---请选择---" value disabled></el-option>
          <!-- 循环商品分类的列表 -->
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" label-width="120px">
        <el-select v-model="form.second_cateid" @change="changeGoods">
          <el-option label="---请选择---" value disabled></el-option>
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品" label-width="120px">
        <el-select v-model="form.goodsid">
          <el-option el-option label="---请选择---" value disabled></el-option>
          <el-option
            v-for="item in secondGoodsList"
            :key="item.id"
            :label="item.goodsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" label-width="120px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="info.title=='活动添加'">添 加</el-button>
      <el-button type="primary" @click="updata" v-else>编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  reqCateList,
  reqGoodsList,
  reqseckilDate,
  reqseckilOne,
  reqseckilDit,

} from "../../../uitls/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, errorAlert } from "../../../uitls/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value: [],
      // 二级分类
      secondCateList: [],
      // 商品
      secondGoodsList: [],
    };
  },
  computed: {
    ...mapGetters({
      // 商品分类的列表
      cateList: "cate/list",
      // 秒杀活动的列表
      reqseckilList: "seckil/reqseckilList",
    }),
  },
  methods: {
    ...mapActions({
      // 秒杀活动列表的方法
      reqSeckillListAction: "seckill/reqSeckillListAction",
      // 商品分类列表的方法
      reqcateList: "cate/reqListAction",
    }),
    cancel() {
      this.info.isshow = false;
      this.empty();
    },
    // 重置
    empty() {
      (this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.value = []),
        // 二级分类
        (this.secondCateList = []),
        // 商品
        (this.secondGoodsList = []);
    },
    change() {
      this.form.begintime = this.value[0];
      this.form.endtime = this.value[1];
    },
    // 添加
    add() {
      reqseckilDate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty();
          this.cancel();
          //刷新秒杀活动列表
          this.reqSeckillListAction();
        }
      });
    },
    // 一级分类发生修改
    chengeFirst() {
      // 根据一级的id来获取二级分类展示列表数据
      // 商品分类列表，通过一级分类的id找到二级分类
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        //   添加到空数组中循环到页面上
        this.secondCateList = res.data.list;
      });
    },
    // 二级分类发生修改
    changeGoods() {
      // 商品列表
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.secondGoodsList = res.data.list;
      });
    },
    getOne(id) {
      reqseckilOne(id).then((res) => {
        //  目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.id = id;
      });
    },
    // 编辑/修改
    updata() {
      console.log(this.form);
      reqseckilDit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("编辑成功")
          this.cancel()
          this.empty()
            //刷新秒杀活动列表
          this.reqSeckillListAction()
        }else{
          errorAlert(res.data.msg)
        }
      });
    },
    
  },
  mounted() {
    this.reqcateList();
    this.reqSeckillListAction();
  },
};
</script>
<style scoped>
</style>