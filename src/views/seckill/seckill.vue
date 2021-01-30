<template>
  <div>
    <!-- 面包屑 -->
    <v-breadcrumb></v-breadcrumb>
    <div class="addBtn">
      <el-button type="primary" plain @click="toOpen">添加</el-button>
    </div>
    <!-- 弹出对话框 -->
    <v-dialog ref="searEdit" :popDialog="popDialog" @cancel="cancel"></v-dialog>
    <!-- 表格 -->
    <v-table  @edit="edit"></v-table>
  </div>
</template>

<script>
import vDialog from "./secDialog";
import vTable from "./secList";
export default {
  data() {
    return {
      popDialog: {
        isShow: false,
        isAdd: true,
      },
      view:{}
    };
  },
  components: {
    vDialog,
    vTable,
  },
  methods: {
    toOpen() {
      this.popDialog.isShow = true;
      this.popDialog.isAdd = true;
    },
    cancel(e) {
      this.popDialog = e;
    },
    //编辑
    edit(e) {
      // console.log(e);
      this.popDialog.isShow = true;
      this.popDialog.isAdd = false;
      this.$refs.searEdit.lookUp(e);
    },
  },
};
</script>

<style lang="" scoped>
</style>
