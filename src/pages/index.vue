<template>
  <div>
    <el-container>
      <el-header class="db-header">
        <h3>小U商城后台管理系统</h3>
        <div class="userInfo">
          <p class="username">{{ getUserInfo.username }}</p>
          <el-button class="out" type="danger" size="mini" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <v-aside></v-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vAside from "../components/aside";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    vAside,
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    // console.log(this.$route);
    this.defaultActive = this.$route.path;
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    // 退出事件
    logout() {
      this.changeUserInfoAction([]);
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #fff;
  height: 10vh !important ;
  font-size: 24px;
  line-height: 10vh;
}
.db-header{
  display: flex;
}
.db-header h3{
  flex: 1;
}
.userInfo {
  width: 200px;
  text-align: center;
}
.username{
  display: block;
  font-size: 24px;
  color: aqua;
  height: 30px;
  line-height: 30px;
}
.out{
  vertical-align: 18px;
}
</style>
