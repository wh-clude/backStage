<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="popUp.isAdd ? '添加菜单' : '编辑菜单'"
      center
      :visible.sync="popUp.isShow"
      :before-close="cancel"
    >
      <el-form :model="menuForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="菜单名称"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="menuForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid" :label-width="formLabelWidth">
          <el-select v-model="menuForm.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="menuForm.type" :label="1">目录</el-radio>
          <el-radio v-model="menuForm.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="menuForm.type == 2"
          label="菜单地址"
          :label-width="formLabelWidth"
        >
          <el-select v-model="menuForm.url" placeholder="请选择">
            <el-option
              v-for="(item, index) in indexRouter"
              :key="index"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单图标" :label-width="formLabelWidth">
          <el-select v-model="menuForm.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="menuForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="popUp.isAdd" type="primary" @click="add('ruleForm')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('ruleForm')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, getOneMenu, editMenu } from "../../util/axios/index";
import { indexRouter } from "../../router/index";
import { mapActions, mapGetters } from "vuex";
// console.log(indexRouter, "erererer");
export default {
  data() {
    return {
      menuForm: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
      ],
      indexRouter: indexRouter,
    };
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //封装取消事件
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popUp.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.menuForm = {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加菜单事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu(this.menuForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          // console.log("error submit!!");
          this.$message.error("error submit!!");
          return false;
        }
      });
      // console.log(this.menuForm, "1212");
    },
    //封装一个查看一条数据的事件
    lookUp(id) {
      getOneMenu({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.menuForm = res.data.list;
          this.menuForm.id = id;
        }
      });
    },
    //封装编辑菜单事件
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMenu(this.menuForm).then((res) => {
            // console.log(res, "编辑成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          // console.log("error submit!!");
          this.$message.error("error submit!!");
          return false;
        }
      });
      // console.log(this.menuForm, "1212");
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  props: ["popUp"],
};
</script>

<style lang="" scoped>
</style>
