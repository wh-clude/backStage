<template>
  <div>
    <v-breadcrumb></v-breadcrumb>
    <div class="addBtn">
      <el-button type="primary" plain @click="toOpen">添加</el-button>
    </div>
    <v-list @edit="edit"></v-list>
    <v-dialog ref="searEdit" :popDialog="popDialog" @cancel="cancel"></v-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="getManagerSize"
      :total="getTotal"
      @current-change="changePage"
      hide-on-single-page
    >
    </el-pagination>
  </div>
</template>

<script>
import vDialog from "./managerDialog";
import vList from "./managerList";
import { getCount, getManagerList } from "../../util/axios/index";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      popDialog: {
        isShow: false, //控制显示隐藏
        isAdd: true, //控制点击的是添加还是编辑
      },
    };
  },
  components: {
    vList,
    vDialog,
  },
  computed: {
    ...mapGetters({
      getTotal: "manager/getCount",
      getManagerList: "manager/getManagerList",
      getManagerSize: "manager/getManagerSize",
    }),
  },
  mounted() {
    this.getCount();
    this.getManager();
  },
  methods: {
    ...mapActions({
      getCount: "manager/getCountAction",
      getManager: "manager/getManagerAction",
      changePageAction: "manager/changePageAction",
    }),
    toOpen() {
      this.popDialog.isShow = true;
      this.popDialog.isAdd = true;
    },
    cancel(e) {
      // console.log(e);
      this.popDialog.isShow = e;
    },
    edit(e) {
      // console.log(e,'dedededede');
      this.popDialog.isShow = true;
      this.popDialog.isAdd = false;
      this.$refs.searEdit.lookUp(e.uid);
    },
    changePage(n) {
      this.changePageAction(n);
    },
  },
};
</script>

<style lang="" scoped>
</style>
