<template>
  <!--弹窗模板 -->
  <el-dialog :title="info.title" :visible.sync="info.isshow">
    <el-form :model="form">
      <el-form-item label="上级分类" label-width="120px">
        <el-select v-model="form.pid" placeholder="---请选择---">
          <el-option label="顶级分类" :value="0"></el-option>
          <!-- 循环上级分类列表 -->
          <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          <!-- :value="item.id":判断是哪一个编号id -->
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" label-width="120px">
        <el-input v-model="form.catename" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 第一种：原生js -->
      <el-form-item label="图片" label-width="120px">
        <div class="my-upload">
          <h3>+</h3>
          <!-- @change:选中事件 -->
          <!--加info.isshow是想添加完数据后换掉input,为了清空图片 -->
          <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          <img v-if="imgUrl" :src="imgUrl" alt="pic" />
        </div>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>

      <el-button type="primary" @click="add" v-if="info.title=='添加商品分类'">添 加</el-button>
      <el-button type="primary" @click="updata" v-else>编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { successAlert, errorAlert } from "../../../uitls/alert";
import { reqCateAdd, reqCateDetail, reqCateDate } from "../../../uitls/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      //图片地址
      imgUrl: "",
    };
  },
  // 获取到list数据循环渲染上级分类列表
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    // 重置form
    empty(){
      this.form={
        pid: "",
        catename: "",
        img: null,
        status: 1,
      }
    },
    ...mapActions({
      // 获取分类的list数据.使用reqList调取到仓库中获取数据的方法
      reqList: "cate/reqListAction",
    }),
    // 数据清空
    empty() {
      (this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      }),
        (this.imgUrl = "");
    },
    // 选择文件
    // 打印一下默认参数e
    changeFile(e) {
      let file = e.target.files[0];
      // 将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      // 给form的img赋值文件,把文件传给form
      this.form.img = file;
      // 定义一个数组，存放图片格式
      let imgArr = [".jpg", ".jpeg", ".png", ".gif"];
      let name = file.name; //图片的后缀格式
      // console.log(name);
      // 从  .  开始截取，一直截取到最后
      let extname = name.slice(name.lastIndexOf("."));
      // console.log(extname);//取到后缀格式

      // includes:判断有没有这个元素，返回真或假
      if (!imgArr.includes(extname)) {
        errorAlert("后缀名格式不匹配");
        return;
      }
      // 判断长传的图片大小。file.size是以b为计算单位
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件太大");
        return;
      }
    },

    // 取消
    cancel() {
      this.info.isshow = false;
    },
    add() {
      //  FormData();//由于上传的参数中有文件，所以通过append方法添加存储数据
      let data = new FormData();
      //通过append(key, value)来添加数据，如果指定的key不存在则会新增一条数据，如果key存在，则添加到数据的末尾
      // data.append("catename",this.form.catename)
      // data.append("img",this.form.img)
      // data.append("pid",this.form.pid)
      // data.append("status",this.form.status)
      // console.log(data);
      // 使用for  in
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      if (this.form.catename != "") {
        // 把数据通过axios发送出去
        reqCateAdd(data).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            //  刷新list列表
            // console.log(res);
            this.reqList();
          }
        });
      } else {
        errorAlert("添加失败");
      }
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqCateDetail(id).then((res) => {
        //  目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.id = id;
        //给图片赋值
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    // 编辑
    updata() {
      // 因为有文件上传，所以要使用FormData()
      let data = new FormData();
      // 使用for in 循环把form数据添加到data中，再使用data传参
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqCateDate(data).then((res) => {
        console.log(res);
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
    },
  },
  mounted() {},
};
</script>
<style scoped>
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;

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
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
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