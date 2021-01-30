<template>
  <div>
    <v-breadcrumb></v-breadcrumb>
    <div class="addBtn">
      <el-button type="primary" plain @click="toOpen">添加</el-button>
    </div>
    <!-- 弹出对话框 -->
    <v-dialog ref="searEdit" @cancel="cancel" :popUp="popUp"></v-dialog>
    <!-- 表格 -->
    <v-table @edit="edit"></v-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="getGoodsSize"
      background
      layout="prev, pager, next"
      :total="getGoodsCount"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vTable from "./goodsList";
import vDialog from './goodsDialog'
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      popUp: {
        isShow: false, //控制显示隐藏
        isAdd: true, //用于控制添加或者编辑 添加true 编辑false
      },
    };
  },
  components: {
    vTable,
    vDialog,
  },
  computed: {
    ...mapGetters({
      getGoodsSize: "goods/getGoodsSize",
      getGoodsCount: "goods/getGoodsCount",
    }),
  },
  methods: {
    ...mapActions({
      getGoodsAction: "goods/getGoodsAction",
      getCountAction: "goods/getCountAction",
      changePageAction: "goods/changePageAction",
    }),
    toOpen() {
      //打开弹框
      this.popUp.isShow = true;
      //告诉弹框是添加
      this.popUp.isAdd = true;
    },
    cancel(e) {
      this.popUp = e;
    },
    //封装edit事件
    edit(e) {
      // console.log(e,'eeeeee');
      this.popUp.isShow = true;
      //告诉弹框是编辑
      this.popUp.isAdd = false;
      // console.log(this.$refs.searEdit);
      this.$refs.searEdit.lookUp(e);
    },
    //切换页码触发的事件
    changePage(n) {
      // console.log(n, "当前页码数");
      this.changePageAction(n);
    },
  },
};
</script>

<style lang="" scoped>
</style>
 