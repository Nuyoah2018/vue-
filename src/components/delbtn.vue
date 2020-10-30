<template>
<!-- 封装一个删除模块 -->
  <el-button type="danger" @click="willDel">删除</el-button>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    willDel() {
      // 点击删除
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //   发起请求删除数据
          this.$emit("confirm")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>