<template>
  <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened">
    <el-form :model="form">
      <el-form-item label="一级分类" label-width="120px">
        <el-select v-model="form.first_cateid" placeholder="请选择" @change="changFirst">
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
        <el-select v-model="form.second_cateid" placeholder="请选择" value="disabled">
          <el-option
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" label-width="120px">
        <!-- :maxlength="5"   最大输入5个字符 -->
        <el-input v-model="form.goodsname" autocomplete="off" :maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="120px">
        <el-input v-model="form.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" label-width="120px">
        <el-input v-model="form.market_price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" label-width="120px">
        <div class="my-upload">
          <h3>+</h3>
          <img v-if="imgUrl" :src="imgUrl" alt />

          <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
        </div>
      </el-form-item>
      <el-form-item label="商品规格" label-width="120px">
        <el-select v-model="form.specsid" @change="changeSpecs">
          <el-option label="---请选择---" value disabled></el-option>
          <el-option
            v-for="item in specList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品属性" label-width="120px">
        <!-- multiple 表单中下拉菜单、input的type是file ,想要多选，设置 -->
        <el-select v-model="form.specsattr" multiple>
          <el-option label="--请选择--" value disabled></el-option>
          <el-option v-for="item in attrList" :key="item.id" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" label-width="120px">
        <el-radio :label="1" v-model="form.isnew">是</el-radio>
        <el-radio :label="2" v-model="form.isnew">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖" label-width="120px">
        <el-radio :label="1" v-model="form.ishot">是</el-radio>
        <el-radio :label="2" v-model="form.ishot">否</el-radio>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label="商品描述" label-width="120px">
          <!-- 富文本编辑器 -->
          <div v-if="info.isshow" id="editor"></div>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      
      <el-button type="primary" @click="add" v-if="info.title=='商品管理'">添加</el-button>
      <el-button type="primary" @click="updata" v-else>编 辑</el-button>
    </div>
 
  </el-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
  reqCateList,
} from "../../../uitls/request";
import { successAlert, errorAlert } from "../../../uitls/alert";
import E from "wangEditor" ;

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //发起请求之前需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //上传图片的临时地址
      imgUrl: "",
      // 二级分类的list
      secondCateList: [],
      //    规格属性的list
      attrList: [],
    };
  },
  computed: {
    //   请求分类的列表
    ...mapGetters({
      //   请求cate分类的列表
      cateList: "cate/list",
      //   先取出规格的数据
      specList: "spec/list",
    }),
  },
  methods: {
       //弹框打开完成，开始创建富文本编辑器
    opened(){
        this.editor=new E("#editor")
        this.editor.create()
        this.editor.txt.html(this.form.description)
      },
    //   重置
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //发起请求之前需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      };
        //上传图片的临时地址
        this.imgUrl = ""
        // 二级分类的list
        this.secondCateList = []
        //    规格属性的list
        this.attrList = []
    },
    //验证
    checked(){
      return new Promise((resolve,reject)=>{
        //验证数据是否均不为空
        if(this.form.first_cateid===""){
          errorAlert("一级分类不能为空")
          return;
        }
        if(this.form.second_cateid===""){
          errorAlert("二级分类不能为空")
          return;
        }
        if(this.form.goodsname===""){
          errorAlert("商品名称不能为空")
          return;
        }
        if(this.form.price===""){
          errorAlert("价格不能为空")
          return;
        }
        if(this.form.market_price===""){
          errorAlert("市场不能为空")
          return;
        }
        if(!this.form.img){
          errorAlert("请选择图片")
          return;
        }
        if(this.form.specsid===""){
          errorAlert("规格不能为空")
          return;
        }
        if(this.form.specsattr.length===0){
          errorAlert("请选择商品属性")
          return;
        }

        if(this.form.description===""){
          errorAlert("描述不能为空")
          return;
        }
        resolve()
      })
    },
    ...mapActions({
      //请求分类的list
      getCateList: "cate/reqListAction",
      //   请求规格的列表
      getSpecList: "spec/reqListAction",
      //   商品的list
      getGoodsList: "goods/reqListAction",
      //  商品的总数
      reqTotalAction: "goods/reqTotalAction",
    }),
    // 一级分类发生了修改
    changFirst() {
      // 二级分类的id应该置空
      this.form.second_cateid = "";

      // 根据一级的id来获取二级分类展示列表数据
      // 商品分类列表，通过一级分类的id找到二级分类
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        //   添加到空数组中循环到页面上
        this.secondCateList = res.data.list;
      });
    },
    // 修改了商品规格
    changeSpecs() {
      //  当规格变了属性要置空
      this.form.specsattr = [];

      // 根据选中的商品规格计算一下展示的属性列表
      // form.specsid:选中规格数据的id号
      // this.specList:规格列表
      // 取出this.specList里面的id是 form.specsid  的那条数据
      // console.log(this.specList)
      // console.log(this.form.specsid)
      let obj = this.specList.find((item) => item.id === this.form.specsid);
      //  console.log(obj)//先取出this.specList里面的id是 form.specsid  的那条数据
      // 要那条数据的上的attrs
      // 放到规格属性的list中，循环渲染到页面商品属性中
      this.attrList = obj.attrs;
      // console.log(this.attrList)
    },
    // 图片的操作
    changeFile(e) {
      //    根据event得到文件
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件不能超过2M");
        return;
      }
      let arr = [".jpg", ".png", ".gif", ".jpeg"];
      if (!arr.includes(file.name.slice(file.name.lastIndexOf(".")))) {
        errorAlert("请上传正确的图片");
        return;
      }
      // 生成一个地址,把文件传进去
      this.imgUrl = URL.createObjectURL(file);
      // 赋值给form
      this.form.img = file;
    },
    // 添加
    add() {
        //获取一下富文本编辑器的内容给form.description 
      this.form.description=this.editor.txt.html()
     this.checked().then(()=>{
      let obj = {
        //对象拷贝，因为有文件，所以使用该方式拷贝
        ...this.form,
      };
      //渲染到页面上需要是数组中的字符串，所以转换一下获取到的specsattr数据
      obj.specsattr = JSON.stringify(obj.specsattr);
      console.log(obj);
      // 有文件上传需要用FormData()
      let data = new FormData();
      //  FormData 接口的append() 方法 会添加一个新值到 FormData 对象内的一个已存在的键中，如果键不存在则会添加该键。
      //  把值循环赋值给data，再使用data发送axios请求
      for (let i in obj) {
        data.append(i, obj[i]);
      }
      console.log(data) 
      //  发送请求，
      reqGoodsAdd(data).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          // 页面重置
          console.log(res);
          this.empty();
          successAlert("添加成功");
          // 刷新列表
          this.getGoodsList();
          this.info.isshow=false
          // 请求总数，因为要做分页
          this.reqTotalAction();
        }
      });
     })
    },
    // 获取一条数据
    getOne(id){
      reqGoodsDetail(id).then(res=>{
        //  目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.id = id;
     
        //给图片赋值
        this.imgUrl = this.$imgPre + this.form.img;
        //6.将form.description 赋值给富文本编辑器
        if(this.editor){
          this.editor.txt.html(this.form.description)
        }
      })
    },
    // 商品修改/编辑
    updata(){
      this.checked().then(()=>{
 //获取一下富文本编辑器的内容给form.description 
      this.form.description=this.editor.txt.html()
      // 因为有文件上传，所以先处理一下
      let data = new FormData();
      for(let i in this.form){
         data.append(i,this.form[i])
      }
      reqGoodsUpdate(data).then(res=>{
        if(res.data.code==200){
          successAlert("编辑成功")
          this.info.isshow=false
          this.empty()
          // 刷新list列表
          this.getGoodsList()
        }else{
                errorAlert(res.data.msg)
            }
      })
      })
     
    },
  

  },
  mounted() {
    //一进来发起分类列表请求
    this.getCateList();
    // 一进来页面先获取规格的列表,传个参数以便状态层中判断分页
    this.getSpecList(true);
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
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;

  position: relative;
}
.my-upload h3 {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
  color: #666;
}
.my-upload .ipt {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
}
.my-upload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
</style>