<template>
  <el-table
    :data="List"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
    <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
    <el-table-column prop="rolename" label="所属角色"></el-table-column>
    <el-table-column prop="address" label="状态">
      <el-button type="primary">启用</el-button>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { successAlert } from "../../../uitls/alert";
import {reqManageDel} from "../../../uitls/request";
export default {
  props: ["List", "info"],
  components: {},
  data() {
    return {};
  },
  methods: {
    edit(uid) {
      //   通过父组件调用add方法
      this.$emit("edit", uid);
    },
    del(uid) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          //   发起请求删除数据
          reqManageDel(uid).then((res) => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              // 调用父组件  重新渲染
              this.$emit("init");
              // 弹出操作成功
              successAlert("操作成功");
            }
          })
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
  },
};
</script>
<style scoped>
</style>