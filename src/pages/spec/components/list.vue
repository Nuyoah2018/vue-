<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
         <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 
      page-size :设置一页有几条数据 ，默认是10 
      total:总数
      current-change :当前页码发生改变的时候触发  
      
    -->
    <!-- <el-pagination
        layout="prev, pager, next"
        :page-size="size"
        @current-change="changePage"
        :total="total">
    </el-pagination> -->
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {reqSpecDel} from "../../../uitls/request"
import {successAlert} from "../../../uitls/alert"
export default {

  components: {},
  data() {
    return {};
  },
    computed: {
    //   去仓库取一下需要的数据
      ...mapGetters({
           list:"spec/list"
      })
  },
  methods: {
      //   去仓库取一下需要的方法
      ...mapActions({
       reqList:"spec/reqListAction"
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
          reqSpecDel(id).then((res) => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              this.reqList();
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
    // 编辑
    edit(id){
        this.$emit("edit", id);
    }
  },
  mounted() {
       //   页面一进来就先刷新列表把数据请求过来
       this.reqList()
  },

};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>