<template>
  <div>
    <el-dialog
      :title="popDialog.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="popDialog.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="managerForm" :rules="rules" ref="ruleForm">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
          <el-select v-model="managerForm.roleid" placeholder="请选择所属角色">
            <el-option
              v-for="item in getRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="managerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            type="password"
            v-model="managerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="managerForm.status"
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
//引入接口文档
import { addManager, editManager, getOneManager } from "../../util/axios/index";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      managerForm: {
        roleid: '', //角色编号
        username: "", //管理员名称
        password: "", //密码,
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
    };
  },
  props: ["popDialog"],
  computed: {
    ...mapGetters({
      managerList: "manager/getManagerList",
      getRoleList:'role/getRoleList'
    }),
  },
  methods: {
    ...mapActions({
      getManagerList: "manager/getManagerAction",
      getCount: "manager/getCountAction",
    }),
    //取消
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //重置reset
    reset() {
      this.managerForm = {
        roleid: 1, //角色编号
        username: "", //管理员名称
        password: "", //密码,
        status: 1, //状态1正常2禁用
      };
    },
    //封装添加事件
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addManager(this.managerForm).then((res) => {
            // console.log(res,'vicbvis');
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getManagerList();
              this.getCount();
            }
          });
        } else {
          // console.log("error submit!!");
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    //封装一个查看一条数据的事件
    lookUp(uid) {
      getOneManager({ uid }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.managerForm = res.data.list;
          this.managerForm.uid = uid;
        }
      });
    },
    //封装编辑管理员事件
    update(formName) {
      // console.log(this.managerForm);
      // editManager(this.managerForm).then(res=>{
      //   console.log(res);
      // })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editManager(this.managerForm).then((res) => {
            // console.log(res, "编辑成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getManagerList();
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
  },
};
</script>

<style lang="" scoped>
</style>
