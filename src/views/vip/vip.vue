<template>
  <div>
    <!-- 面包屑 -->
    <v-breadcrumb></v-breadcrumb>

    <!-- 弹出对话框 -->
    <v-dialog ref="searEdit" :popDialog="popDialog" @cancel="cancel"></v-dialog>
    <!-- 表格 -->
    <v-table class="db-table"  @edit="edit"></v-table>
  </div>
</template>

<script>
import vDialog from "./vipDialog";
import vTable from "./vipList";
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
.db-table{
  margin-top: 50px;
}
</style>
