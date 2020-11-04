<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <!-- :props="{children: 'child',label: 'label'}"
            children:用哪个字段来判断有没有下个子节点 
            label :用哪个字段来展示文字


            data:需要时树形结构的数据
            node-key 选中的时候 getCheckedKeys() 获取的哪个字段拼成的数组
          -->
          <el-tree
            :data="menuList"
            ref="tree"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="end">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='角色添加'">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, errorAlert } from "../../../uitls/alert";
import {
  reqMenuList,
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../uitls/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      // 树形控件数据
      menuList: [],
    };
  },
  methods: {
    //重置form
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    // 取消按钮
    end() {
      this.info.isshow = false;
    },
    //清空树
    emptyTree() {
      //清空树
      this.$refs.tree.setCheckedKeys([]);
    },
    // 点击添加
    add() {
      if (this.form.rolename === "") {
        errorAlert("用户名称不能为空哦！");
        return;
      }
      if (this.$refs.tree.getCheckedKeys().length === 0) {
        errorAlert("角色必须分配权限");
        return;
      }
      //目前tree上的数据，与form无关。
      // 我们需要将tree上的数据取出来，给form.menus，然后再将form传递给后端，实现添加

      // this.$refs.tree.getCheckedNodes() 获取选中节点的所有数据
      // this.$refs.tree.getCheckedKeys() 选中节点的key值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          // 调用父组件  重新渲染
          this.$emit("init");
          // 关闭弹窗
          this.end();
          //重置form
          this.empty();
          //清空树
          this.emptyTree();
          // 弹出操作成功
          alert("操作成功");
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 因为没有id.所以写一个id定义一下点击的是哪一个
          this.form.id = id;
          // 通过key值获取，设置节点
          this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        }
      });
    },
    // 编辑
    updata() {
      //将tree上的数据取出给form，然后再发请求
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.form);
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          // 关闭弹窗
          this.end();
          //弹成功
          successAlert("修改成功");
          //清空树
          this.emptyTree();
          //form重置
          this.empty();
          // 调用父组件  重新渲染
          this.$emit("init");
        }
      });
    },
  },
  mounted() {
    // 打开先刷新菜单列表
    reqMenuList().then((res) => {
      this.menuList = res.data.list;
    });
  },
};
</script>