<template>
  <div>
    <!-- Form -->
    <el-dialog
      title="修改信息"
      center
      :visible.sync="popDialog.isShow"
      :before-close="cancel"
    >
      <el-form :model="memberForm" :rules="rules" ref="ruleForm">
        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="memberForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          prop="nickname"
          :label-width="formLabelWidth"
        >
          <el-input v-model="memberForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="memberForm.password" autocomplete="off"></el-input>
          <span>留空则不修改</span>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="memberForm.status"
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

        <el-button type="primary" @click="update('ruleForm')">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editMember, getOneMember } from "../../util/axios/index";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      memberForm: {
        uid: "", //会员编号，必填项
        nickname: "", //昵称
        phone: '', //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        phone: [
          {
            type: "string",
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getMemberListAction();
  },
  methods: {
    ...mapActions({
      getMemberListAction: "member/getMemberListAction",
    }),
    //封装取消函数b
    cancel() {
      this.$emit("cancel", { isShow: false, isAdd: this.popDialog.isAdd });
      this.reset();
    },
    //重置表单的内容
    reset() {
      this.memberForm = {
        uid: "", //会员编号，必填项
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态1正常2禁用
      };
    },

    //封装修改事件
    update(formName) {
      console.log(this.memberForm, "sssss");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMember(this.memberForm).then((res) => {
            // console.log(res, "添加成功");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMemberListAction();
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
    lookUp(uid) {
      // console.log(uid,'得到的uid');
      getOneMember({ uid }).then((res) => {
        // console.log(res,'结果');
        if (res.data.code == 200) {
          this.memberForm = res.data.list;
          this.memberForm.uid = uid;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  props: ["popDialog"],
};
</script>

<style lang="" scoped>
</style>
