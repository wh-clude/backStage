<template>
  <div>
    <el-table :data="roleList" border style="width: 100%" header-align="center">
      <el-table-column prop="id" label="角色编号" align="center">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="200" align="center">
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
      <el-table-column label="操作" width="300" align="center">
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
import { deleteRole, editRole } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getRoleList();
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
      console.log(row);
      // console.log(this.menuList);
      row.status = 2;
      editRole(row).then((res) => {
        // console.log(res);
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
      editRole(row).then((res) => {
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
      roleList: "role/getRoleList",
    }),
  },
};
</script>

<style lang="" scoped>
</style>
