<template>
  <div>
    <div class="container">
      <el-form
        :model="loginList"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginList.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginList.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
//引入封装好的登录接口的模块
import { userLogin } from "../util/axios/index";
export default {
  data() {
    return {
      loginList: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      // console.log(formName,'1111111111');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调取接口
          // console.log(this.loginList);
          userLogin(this.loginList).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // sessionStorage.setItem(
              //   "loginInfo",
              //   JSON.stringify(res.data.list)
              // );
              this.changeUserInfoAction(res.data.list);
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          //   console.log('err');
          this.$message.error("用户名或者密码错误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="" scoped>
@import "../components/css/login.css";
</style>
