<template>
  <!--弹窗模板 -->

  <el-dialog :title="info.title" :visible.sync="info.isshow" :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="标题" label-width="120px">
        <el-input v-model="form.title" autocomplete="off"></el-input>
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

      <el-button type="primary" @click="add" v-if="info.title=='添加轮播图'">添 加</el-button>
      <el-button type="primary" @click="update" v-else>编 辑</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { successAlert } from "../../../uitls/alert";
import {
  reqBannerDate,
  reqBannerDit,
  reqBannerOne,
} from "../../../uitls/request";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      // 图片地址
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    handleClose() {
      this.$confirm("是否取消操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.info.isshow = false;
        })
        .catch(() => {
          this.info.isshow = true;
        });
    },
    //   数据清空
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      // 图片地址
      this.imgUrl = "";
    },
    ...mapActions({
      reqBannerList: "banner/reqBannerListAction",
    }),
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
    cancel() {
      this.empty();
      this.info.isshow = false;
    },
    //  添加
    add() {
      //  FormData();//由于上传的参数中有文件，所以通过append方法添加存储数据
      let data = new FormData();
      //  把form的数据循环添加进data
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqBannerDate(data).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.cancel();
          this.reqBannerList();
          this.empty();
        } else {
          errorAlert("添加失败");
        }
      });
    },
    //获取一条的数据
    getOne(id) {
      //发起获取一条数据的请求
      reqBannerOne(id).then((res) => {
        //  目前form上是没有id字段
        this.form = res.data.list;
        //补id
        this.form.id = id;
        //给图片赋值
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    //  编辑页面
    update() {
      let data = new FormData();
      //  把form的数据循环添加进data
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqBannerDit(data).then((res) => {
        if (res.data.code == 200) {
          successAlert("编辑成功");
          this.cancel();
          this.reqBannerList();
          this.empty();
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