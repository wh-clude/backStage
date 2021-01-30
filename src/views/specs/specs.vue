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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="getSpecsSize"
      :total="getTotal"
      @current-change="changePage"
      hide-on-single-page
    >
    </el-pagination>
  </div>
</template>

<script>
import vTable from "./specsList";
import vDialog from "./specsDialog";
import { getSpecsCount, getSpecsList } from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";
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
      getTotal: "specs/getSpecsCount",
      getSpecsSize: "specs/getSpecsSize",
      getSpecsList:'specs/getSpecsList'
    }),
  },
  mounted() {
    this.getSpecsCount();
    this.getSpecs();
    this.changePageAction()
  },
  methods: {
    ...mapActions({
      getSpecsCount: "specs/getCountAction",
      getSpecs: "specs/getSpecsAction",
      changePageAction: "specs/changePageAction",
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
    changePage(n) {
      console.log(n);
      this.changePageAction(n);
    },
  },
};
</script>

<style lang="" scoped>
</style>
 