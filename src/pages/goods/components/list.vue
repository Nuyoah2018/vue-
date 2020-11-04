<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="first_cateid" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
         <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="市场价格">
        <template slot-scope="scope">
        <span>{{scope.row.market_price}}</span>
        </template>
      </el-table-column>
       <el-table-column label="图片">
        <template slot-scope="scope">
        <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
       <el-table-column label="是否新品">
        <template slot-scope="scope">
         <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
       <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
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
    <el-pagination
        layout="prev, pager, next"
        :page-size="size"
        @current-change="changePage"
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {reqGoodsDel} from "../../../uitls/request"
import {successAlert,errorAlert} from "../../../uitls/alert"
export default {

  components: {},
  data() {
    return {};
  },
    computed: {
    //   去仓库取一下需要的数据
      ...mapGetters({
           list:"goods/list",
           size:"goods/size",
           total:"goods/total",
           
      })
  },
  methods: {
      //   去仓库取一下需要的方法
      ...mapActions({
       reqList:"goods/reqListAction",
       getTotalAction:"goods/reqTotalAction",//总数
       changePageAction:"goods/changePageAction",//修改页码
       getGoodsList: "goods/reqListAction",  //   商品的list
      }),
    //   修改页码
    changePage(page){
        this.changePageAction(page)
       
    },
    // 编辑
    edit(id){
        this.$emit("edit", id);
    },
    // 删除按钮
       del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //   发起请求删除数据
          reqGoodsDel(id).then((res) => {
            if (res.data.code === 200) {
              successAlert("删除成功");
              // 刷新列表

              this.reqList();
              // 请求总数
              this.getTotalAction();
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
       //   页面一进来就先刷新列表把数据请求过来
       this.reqList()
    // //    一进来页面就要请求总数
    this.getTotalAction()
  },

};
</script>
<style scoped>
img{
    width: 80px;
    height: 80px;
}
</style>