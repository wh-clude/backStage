<template>
  <div>
    <el-aside width="200px">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            v-for="item in getUserInfo.menus"
            :key="item.id"
            :index="item.id.toString()"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="list in item.children"
                :key="list.id"
                :index="list.url"
                >{{ list.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      defaultActive: "/home",
      // navList: [],
    };
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  mounted() {
    // console.log(this.getUserInfo,'登录信息');
    this.defaultActive = this.$route.path;
    // if (sessionStorage.getItem("loginInfo")) {
    //   this.navList = JSON.parse(sessionStorage.getItem("loginInfo")).menus;
    // }
  },
};
</script>

<style lang="" scoped>
.el-aside {
  background-color: #545c64;
  color: #fff;
  height: 90vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-menu-vertical-demo {
  width: 200px !important;
}
</style>
