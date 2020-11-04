<template>
  <!-- reqList:就是仓库的数据放到这里 -->
  <el-table
    :data="reqList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :default-expand-all="false"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="uid" label="用户编号" sortable width="180"></el-table-column>
    <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
    <el-table-column prop="phone" label="手机号" sortable width="180"></el-table-column>

    <el-table-column prop="address" label="状态">
      <el-button type="primary">启用</el-button>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      reqList: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      mapList: "member/reqListAction",
    }),
    // 点击编辑弹出框
    // 子传父
    // 传一个id给父组件，再从父组件传给list
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
  mounted() {
    this.mapList();
  },
};
</script>
<style scoped>
</style>