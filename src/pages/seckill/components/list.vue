<template>
  <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :default-expand-all="false"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="title" label="活动名称" sortable width="180"></el-table-column>
    <el-table-column prop="address" label="状态">
      <el-button type="primary">启用</el-button>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {reqseckilDel} from "../../../uitls/request"
import {successAlert} from "../../../uitls/alert"
export default {
  props:["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
        list:"seckill/list"
    })
  },
  methods: {
    ...mapActions({
      reqListAction:"seckill/reqSeckillListAction"
    }),
    // 点击编辑
    edit(id){
     this.$emit("edit", id);
     console.log(this.form);
    },
      // 点击删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //   发起请求删除数据
          reqseckilDel(id).then((res) => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              // 刷新秒杀活动
              this.reqListAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqListAction()
  },
};
</script>
<style scoped>
</style>