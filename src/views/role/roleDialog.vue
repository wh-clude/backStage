<template>
  <div>
    <!-- Form -->
    <el-dialog
      :title="popDialog.isAdd ? '添加角色' : '编辑角色'"
      center
      :visible.sync="popDialog.isShow"
      :before-close="cancel"
    >
      <el-form :model="roleForm" :rules="rules" ref="ruleForm">
        <el-form-item
          label="角色名称"
          prop="rolename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="getMenuList"
            show-checkbox
            node-key="id"
            ref="tree"
            default-expand-all
            :props="defaultProps"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="roleForm.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="popDialog.isAdd"
          type="primary"
          @click="add('ruleForm')"
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
import { addRole, editRole, getOneRole } from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      roleForm: {
        id: 0, //编号，必填项
        rolename: "", //角色名称
        menus: "", //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getMenuListAction: "menu/getMenuListAction",
    }),
    //封装取消函数b
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popDialog.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.roleForm = {
        rolename: "", //角色名称
        menus: [], //角色权限//菜单权限 存放的是菜单编号，用逗号隔开 '[1,2,3]'
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加事件
    add(formName) {
      // console.log(this.$refs.tree.getCheckedKeys());
      // console.log(this.roleForm,'sssss');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          addRole(this.roleForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
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
    },
    //封装修改事件
    update(formName) {
      // console.log(this.roleForm,'sssss');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.roleForm.menus = this.$refs.tree.getCheckedKeys().join(",");
          editRole(this.roleForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getRoleList();
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
    },
    lookUp(id) {
      // console.log(id);
      getOneRole({ id }).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.roleForm = res.data.list;
          this.$refs.tree.setCheckedKeys(this.roleForm.menus.split(","));
          this.roleForm.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  props: ["popDialog"],
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
      getMenuList: "menu/getMenuList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
