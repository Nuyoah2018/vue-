<template>
  <!-- list:就是仓库的数据放到这里 -->
  <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :default-expand-all="false"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
    <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
    <!-- scope.row.img:  scope.row就是item,这是element-ui上的方法 -->
    <!-- 因为图片是一个地址，在开发环境中需要加http://localhost:3000 -->
    <el-table-column prop="rolename" label="图片">
      <template slot-scope="scope">
        <img :src="$imgPre+scope.row.img" v-if="scope.row.img!=='null'" />
      </template>
    </el-table-column>
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
import { mapGetters, mapActions } from "vuex";
import {successAlert,errorAlert} from "../../../uitls/alert"
import {reqBannerDel} from "../../../uitls/request"
export default {
       props:["info"],
  components: {},
  data() {
    return {};
  },
  computed: {
      ...mapGetters({
          list:"banner/list"
      })
  },
  methods: {
      ...mapActions({
          BannerListAction:"banner/reqBannerListAction"
      }),
          // 点击删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //   发起请求删除数据
          reqBannerDel(id).then((res) => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              this.BannerListAction();
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
    // 点击编辑
    edit(id){
        this.info.isshow=true
      this.$emit("edit", id);
    }
  },
  mounted() {
     this.BannerListAction()
  },
};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>