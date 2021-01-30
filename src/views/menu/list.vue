<template>
  <div>
    <el-table :data="menuList" border style="width: 100%" header-align="center"  row-key="id"   default-expand-all   :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="菜单编号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="120" align="center">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" align="center" width="120">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="菜单图标"
        width="160"
        header-align="center"
      >

      </el-table-column>
      <el-table-column
        prop="url"
        label="菜单地址"
        header-align="center"
      >
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="sta">
          <el-button
            v-if="sta.row.status == 1"
            type="success"
            plain
            size="small"
            @click="openStatus(sta.row)"
            >启动</el-button
          >
          <el-button
            v-else
            type="info"
            plain
            size="small"
            @click="closeStatus(sta.row)"
            >禁用</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row.id)"
            type="primary"
            plain
            size="small"
            >编辑</el-button
          >
          <el-button type="danger" plain size="small" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { delMenu, editMenu } from "../../util/axios/index";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this);
    this.getMenuList();
  },
  methods: {
    //封装编辑事件
    edit(id) {
      this.$emit("edit", id);
    },
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //封装删除事件
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openStatus(row) {
      // console.log(row);
      // console.log(this.menuList);
      row.status = 2;
      editMenu(row).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    closeStatus(row) {
      // console.log(row.status);
      // console.log(this.menuList);
      row.status = 1;
      editMenu(row).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
